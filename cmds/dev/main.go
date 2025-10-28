package main

import (
	"go.uber.org/fx"
	"go.uber.org/fx/fxevent"
	"go.uber.org/zap"

	"github.com/karngyan/snaphouse/db"
	"github.com/karngyan/snaphouse/libs/logger"
	"github.com/karngyan/snaphouse/ui_api"
)

func main() {
	fx.New(
		fx.Provide(
			logger.New,
		),
		fx.Decorate(func(l *zap.Logger) *zap.Logger {
			return l.With(zap.String("service", "dev"))
		}),
		fx.Invoke(
			db.Init,
			ui_api.Run,
		),
		fx.WithLogger(func(l *zap.Logger) fxevent.Logger {
			return &fxevent.ZapLogger{
				Logger: l,
			}
		}),
	).Run()
}
