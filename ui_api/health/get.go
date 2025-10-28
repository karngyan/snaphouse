package health

import (
	"net/http"

	"github.com/karngyan/snaphouse/ui_api/web"
)

func Get(ctx web.Context) error {
	return ctx.JSON(http.StatusOK, map[string]string{"status": "ok"})
}
