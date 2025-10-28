package web

import (
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

type Context struct {
	echo.Context

	L *zap.Logger
}

type HandlerFunc func(ctx Context) error

// WrapPublic wraps a handler for public (unauthenticated) endpoints
// Extracts tenant from request host
func WrapPublic(h HandlerFunc, l *zap.Logger) echo.HandlerFunc {
	return func(c echo.Context) error {
		rid := c.Response().Header().Get(echo.HeaderXRequestID)

		ctx := Context{
			Context: c,
			L:       l.With(zap.String("request_id", rid)),
		}

		return h(ctx)
	}
}
