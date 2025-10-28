package logger

import (
	"context"
	"errors"
	"fmt"
	"syscall"

	"github.com/karngyan/snaphouse/config"

	"github.com/jackc/pgx/v5/tracelog"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func New(lc fx.Lifecycle) (*zap.Logger, error) {
	cfg := zap.NewProductionConfig()
	if config.IsDev() {
		cfg = zap.NewDevelopmentConfig()
		cfg.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	}

	l, err := cfg.Build()
	if err != nil {
		return nil, err
	}

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			l.Info("syncing logger before shutdown")
			err := l.Sync()

			// ignore ENOTTY and EINVAL errors when logs are written to a console or container
			// https://github.com/uber-go/zap/issues/991#issuecomment-962098428
			if err != nil && !errors.Is(err, syscall.ENOTTY) && !errors.Is(err, syscall.EINVAL) {
				return err
			}

			return nil
		},
	})

	return l, nil
}

func NewNop() *zap.Logger {
	return zap.NewNop()
}

type PgxLogger struct {
	l *zap.Logger
}

func NewPgxLogger(l *zap.Logger) *PgxLogger {
	return &PgxLogger{l: l.WithOptions(zap.AddCallerSkip(1))}
}

func (pl *PgxLogger) Log(ctx context.Context, level tracelog.LogLevel, msg string, data map[string]any) {
	fields := make([]zapcore.Field, len(data))
	i := 0
	for k, v := range data {
		fields[i] = zap.Any(k, v)
		i++
	}

	switch level {
	case tracelog.LogLevelTrace:
		pl.l.Debug(msg, append(fields, zap.Stringer("PGX_LOG_LEVEL", level))...)
	case tracelog.LogLevelDebug:
		pl.l.Debug(msg, fields...)
	case tracelog.LogLevelInfo:
		pl.l.Info(msg, fields...)
	case tracelog.LogLevelWarn:
		pl.l.Warn(msg, fields...)
	case tracelog.LogLevelError:
		pl.l.Error(msg, fields...)
	default:
		pl.l.Error(msg, append(fields, zap.Stringer("PGX_LOG_LEVEL", level))...)
	}
}

type BigCacheLogger struct {
	*zap.Logger
}

func NewBigCacheLogger(l *zap.Logger) *BigCacheLogger {
	return &BigCacheLogger{l.WithOptions(zap.AddCallerSkip(1))}
}

// Printf is a convenience method to log a message using Printf-style formatting.
// bigcache.Logger interface implementation
func (z *BigCacheLogger) Printf(format string, v ...interface{}) {
	z.Info(fmt.Sprintf(format, v...))
}
