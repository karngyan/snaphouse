package ui_api

import (
	"bytes"
	"context"
	"embed"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"net/http/httputil"
	"net/url"
	"path"
	"strings"
	"sync"
	"text/template"
	"time"

	"github.com/karngyan/snaphouse/config"
	"github.com/karngyan/snaphouse/ui_api/health"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

// embeddedUI holds the embedded static files for production builds
// To embed the UI files, they need to be in a subdirectory of this package
// Use a build script to copy ui/dist -> ui_api/dist before building for production
//
//go:embed all:dist
var embeddedUI embed.FS

var (
	indexTplOnce sync.Once
	indexTpl     *template.Template
	indexTplErr  error
)

func Run(lc fx.Lifecycle, l *zap.Logger) error {
	e := echo.New()

	if !config.IsDev() {
		e.HideBanner = true
		e.HidePort = true
	}

	configureMiddleware(e, l)

	if err := configureRoutes(e, l); err != nil {
		return fmt.Errorf("failed to configure routes: %w", err)
	}

	server := &http.Server{
		Addr:              fmt.Sprintf("0.0.0.0:%d", config.UiApi.Port()),
		Handler:           e,
		ReadTimeout:       30 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
		MaxHeaderBytes:    1 << 20, // 1 MB
	}

	lc.Append(fx.Hook{
		OnStart: func(ctx context.Context) error {
			go func() {
				l.Info("starting ui_api server", zap.String("addr", server.Addr))
				if err := e.StartServer(server); err != nil && errors.Is(err, http.ErrServerClosed) {
					l.Error("error starting ui_api server", zap.Error(err))
				}
			}()
			return nil
		},
		OnStop: func(ctx context.Context) error {
			l.Info("shutdown signal received")
			return e.Shutdown(ctx)
		},
	})

	l.Info("ui_api server started", zap.String("addr", server.Addr))

	return nil
}

func configureMiddleware(e *echo.Echo, l *zap.Logger) {
	// Request ID must come first to be available in all other middleware
	e.Use(middleware.RequestID())

	// Panic recovery
	e.Use(middleware.RecoverWithConfig(middleware.RecoverConfig{
		StackSize: 1 << 12, // 4 KB
		LogErrorFunc: func(c echo.Context, err error, stack []byte) error {
			l.Error("recovered from panic",
				zap.Error(err),
				zap.ByteString("stack", stack),
				zap.String("request_id", c.Response().Header().Get(echo.HeaderXRequestID)),
			)
			return nil
		},
	}))

	// Request logging
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			l.Info("request",
				zap.String("method", v.Method),
				zap.String("uri", v.URI),
				zap.Int("status", v.Status),
				zap.Duration("latency", v.Latency),
				zap.String("remote_ip", v.RemoteIP),
				zap.String("request_id", v.RequestID),
				zap.String("content_length", v.ContentLength),
				zap.Int64("response_size", v.ResponseSize),
			)
			return nil
		},
		LogLatency:       true,
		LogRemoteIP:      true,
		LogMethod:        true,
		LogURI:           true,
		LogRequestID:     true,
		LogUserAgent:     true,
		LogStatus:        true,
		LogContentLength: true,
		LogResponseSize:  true,
	}))

	// CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: config.UiApi.CorsAllowedOrigins(),
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
			http.MethodOptions,
			http.MethodPatch,
		},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Origin", "X-Request-ID"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           int((24 * time.Hour).Seconds()),
	}))

	// IP extraction strategy
	if config.IsDev() {
		e.IPExtractor = echo.ExtractIPDirect()
	} else {
		e.IPExtractor = echo.ExtractIPFromXFFHeader()
	}
}

func configureRoutes(e *echo.Echo, l *zap.Logger) error {
	// Health check endpoint
	health.Configure(e, l)

	fmt.Println("config.IsDev()", config.IsDev())
	fmt.Println("config.Ui.Port()", config.Ui.Port())
	fmt.Println("config.UiApi.Port()", config.UiApi.Port())

	if config.IsDev() {
		return configureDevelopmentProxy(e, l)
	}

	return configureProductionStatic(e)
}

func configureDevelopmentProxy(e *echo.Echo, _ *zap.Logger) error {
	target, err := url.Parse(fmt.Sprintf("http://localhost:%d", config.Ui.Port()))
	if err != nil {
		return err
	}

	rp := httputil.NewSingleHostReverseProxy(target)

	origDirector := rp.Director
	rp.Director = func(req *http.Request) {
		origDirector(req)
		req.Header.Set("X-Forwarded-Host", req.Host)
		req.Header.Set("X-Forwarded-Proto", schemeOf(req))
	}

	// WebSockets pass through since Go’s ReverseProxy supports them.
	// Optionally tune timeouts for dev
	rp.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
		rw.WriteHeader(http.StatusBadGateway)
		_, _ = rw.Write([]byte("dev server not reachable"))
	}

	e.Any("/*", echo.WrapHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rp.ServeHTTP(w, r)
	})))

	return nil
}

func configureProductionStatic(e *echo.Echo) error {
	// Get the embedded filesystem, stripping the "dist" prefix
	distFS, err := fs.Sub(embeddedUI, "dist")
	if err != nil {
		return fmt.Errorf("failed to access embedded UI files: %w", err)
	}

	// parse template once
	indexTplOnce.Do(func() {
		f, err := distFS.Open("index.html")
		if err != nil {
			indexTplErr = fmt.Errorf("index.html not found in embedded UI files: %w", err)
			return
		}
		defer f.Close()
		b, _ := io.ReadAll(f)
		// Parse with html/template
		indexTpl, indexTplErr = template.New("index.html").Parse(string(b))
	})

	if indexTplErr != nil {
		return indexTplErr
	}

	// Serve embedded static files
	fileServer := http.FileServer(http.FS(distFS))

	// Catch-all route for serving static files with SPA fallback
	e.GET("/*", echo.WrapHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		p := r.URL.Path
		if p == "/" {
			p = "/index.html"
		}

		// Serve assets directly
		if strings.HasPrefix(p, "/assets/") || strings.HasPrefix(p, "/static/") || path.Ext(p) != "" && p != "/index.html" {
			// Long cache for hashed assets
			if strings.HasPrefix(p, "/assets/") {
				w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
			} else {
				w.Header().Set("Cache-Control", "public, max-age=3600")
			}
			fileServer.ServeHTTP(w, r)
			return
		}

		// SPA fallback + dynamic meta
		if isHTMLRequest(echo.New().NewContext(r, w)) {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			// HTML should be short/no-cache because it varies per tenant
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
			w.Header().Set("Pragma", "no-cache")
			w.Header().Set("Expires", "0")

			var buf bytes.Buffer
			if err := indexTpl.Execute(&buf, nil); err != nil {
				http.Error(w, "template render error", http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusOK)
			_, _ = w.Write(buf.Bytes())
			return
		}

		// default: serve file or fallback
		fileServer.ServeHTTP(w, r)
	})))

	return nil
}

func isHTMLRequest(c echo.Context) bool {
	accept := c.Request().Header.Get("Accept")
	if strings.Contains(accept, "text/html") {
		return true
	}
	// Also serve HTML when no extension (SPA routes)
	ext := path.Ext(c.Request().URL.Path)
	return ext == "" || ext == ".html"
}

func schemeOf(r *http.Request) string {
	if r.Header.Get("X-Forwarded-Proto") != "" {
		return r.Header.Get("X-Forwarded-Proto")
	}
	if r.TLS != nil {
		return "https"
	}
	return "http"
}
