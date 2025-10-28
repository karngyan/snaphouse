package health

import (
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"github.com/karngyan/snaphouse/ui_api/web"
)

func Configure(e *echo.Echo, l *zap.Logger) {
	e.GET("/v1/health", web.WrapPublic(Get, l))
}
