package db

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/tracelog"
	"github.com/karngyan/snaphouse/config"
	"github.com/karngyan/snaphouse/libs/logger"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

var (
	//go:embed schema/global/*.sql
	embedGlobalSchema embed.FS
	//go:embed schema/tenant/*.sql
	embedTenantSchema embed.FS
	defaultPgxPool    *pgxpool.Pool
)

const (
	globalSchema = "public"
)

func Init(lc fx.Lifecycle, l *zap.Logger) error {
	ctx := context.Background()

	dbc, err := pgxpool.ParseConfig(config.Database.DSN())
	if err != nil {
		return err
	}

	// Connection pool settings
	dbc.MaxConns = 100
	dbc.MinConns = 10
	dbc.MaxConnLifetime = 30 * time.Minute
	dbc.MaxConnIdleTime = 5 * time.Minute
	dbc.HealthCheckPeriod = 1 * time.Minute

	if config.IsDev() {
		dbc.ConnConfig.Tracer = &tracelog.TraceLog{
			Logger:   logger.NewPgxLogger(l),
			LogLevel: tracelog.LogLevelTrace,
			Config:   tracelog.DefaultTraceLogConfig(),
		}
	}

	defaultPgxPool, err = pgxpool.NewWithConfig(context.Background(), dbc)
	if err != nil {
		return err
	}

	lc.Append(fx.Hook{
		OnStop: func(ctx context.Context) error {
			l.Info("closing db pool")
			if defaultPgxPool != nil {
				defaultPgxPool.Close()
			}
			return nil
		},
	})

	l.Info("db pool initialized")

	err = ApplyGlobalSchema(ctx, l, defaultPgxPool)
	if err != nil {
		l.Error("error applying global schema", zap.Error(err))
		return err
	}
	l.Info("applied global schema")

	return nil
}

// GetPool returns the default pgxpool
func GetPool() *pgxpool.Pool {
	return defaultPgxPool
}

// ApplyGlobalSchema applies the global schema to the public schema
func ApplyGlobalSchema(ctx context.Context, l *zap.Logger, pool *pgxpool.Pool) error {
	if pool == nil {
		return fmt.Errorf("pool not initialized")
	}

	l.Info("applying global schema to public schema")

	// Get all global SQL files
	sqlFiles, err := getGlobalSQLFiles()
	if err != nil {
		return err
	}

	l.Info("found global SQL schema files", zap.Strings("files", sqlFiles))

	// Acquire a single connection to ensure all operations use the same connection
	conn, err := pool.Acquire(ctx)
	if err != nil {
		return fmt.Errorf("failed to acquire connection: %w", err)
	}
	defer conn.Release()

	// Set search_path to public schema for this connection
	_, err = conn.Exec(ctx, "SET search_path TO "+pgx.Identifier{globalSchema}.Sanitize())
	if err != nil {
		return fmt.Errorf("failed to set search_path: %w", err)
	}

	// Execute each SQL file using the same connection
	for _, filename := range sqlFiles {
		filePath := filepath.Join("schema/global", filename)

		l.Info("executing global schema", zap.String("file", filename))

		// Read the SQL content
		content, err := embedGlobalSchema.ReadFile(filePath)
		if err != nil {
			return fmt.Errorf("failed to read file %s: %w", filename, err)
		}

		// Execute the SQL on the acquired connection
		_, err = conn.Exec(ctx, string(content))
		if err != nil {
			return fmt.Errorf("failed to execute global schema %s: %w", filename, err)
		}

		l.Info("global schema executed successfully", zap.String("file", filename))
	}

	l.Info("all global schemas completed successfully")
	return nil
}

// ApplySchemaForTenant creates a schema for a tenant and applies tenant-specific migrations
func ApplySchemaForTenant(ctx context.Context, l *zap.Logger, pool *pgxpool.Pool, tenant string) error {
	if pool == nil {
		return fmt.Errorf("pool not initialized")
	}

	// Validate tenant name (only alphanumeric and underscore to prevent SQL injection)
	if !isValidSchemaName(tenant) {
		return fmt.Errorf("invalid tenant name: %s", tenant)
	}

	l.Info("creating schema for tenant", zap.String("tenant", tenant))

	// Create schema if it doesn't exist (this can use pool.Exec since it's schema creation)
	_, err := pool.Exec(ctx, fmt.Sprintf("CREATE SCHEMA IF NOT EXISTS %s", pgx.Identifier{tenant}.Sanitize()))
	if err != nil {
		return fmt.Errorf("failed to create schema %s: %w", tenant, err)
	}

	// Get all tenant SQL files
	sqlFiles, err := getTenantSQLFiles()
	if err != nil {
		return err
	}

	l.Info("found tenant SQL schema files", zap.Strings("files", sqlFiles), zap.String("tenant", tenant))

	// Acquire a single connection to ensure all operations use the same connection
	conn, err := pool.Acquire(ctx)
	if err != nil {
		return fmt.Errorf("failed to acquire connection: %w", err)
	}
	defer conn.Release()

	// Set search_path to the tenant schema for this connection
	_, err = conn.Exec(ctx, fmt.Sprintf("SET search_path TO %s", pgx.Identifier{tenant}.Sanitize()))
	if err != nil {
		return fmt.Errorf("failed to set search_path: %w", err)
	}

	// Execute each SQL file using the same connection
	for _, filename := range sqlFiles {
		filePath := filepath.Join("schema/tenant", filename)

		l.Info("executing tenant schema", zap.String("file", filename), zap.String("tenant", tenant))

		// Read the SQL content
		content, err := embedTenantSchema.ReadFile(filePath)
		if err != nil {
			return fmt.Errorf("failed to read file %s: %w", filename, err)
		}

		// Execute the SQL on the acquired connection
		_, err = conn.Exec(ctx, string(content))
		if err != nil {
			return fmt.Errorf("failed to execute tenant schema %s for tenant %s: %w", filename, tenant, err)
		}

		l.Info("tenant schema executed successfully", zap.String("file", filename), zap.String("tenant", tenant))
	}

	l.Info("all tenant schemas completed successfully for tenant", zap.String("tenant", tenant))
	return nil
}

// OnboardTenant creates a new schema and applies all migrations for a new organization
func OnboardTenant(ctx context.Context, l *zap.Logger, tenant string) error {
	if l == nil {
		l = logger.NewNop()
	}

	l.Info("onboarding new tenant", zap.String("tenant", tenant))

	err := ApplySchemaForTenant(ctx, l, defaultPgxPool, tenant)
	if err != nil {
		return fmt.Errorf("failed to onboard tenant %s: %w", tenant, err)
	}

	l.Info("tenant onboarded successfully", zap.String("tenant", tenant))
	return nil
}

// TenantConn wraps a connection and automatically sets search_path
// This is what you'll use in your handlers/services
type TenantConn struct {
	conn   *pgxpool.Conn
	tenant string
}

// Release releases the connection back to the pool
func (tc *TenantConn) Release() {
	if tc.conn != nil {
		tc.conn.Release()
	}
}

// Conn returns the underlying connection for use with sqlc queries
func (tc *TenantConn) Conn() *pgxpool.Conn {
	return tc.conn
}

// AcquireForTenant gets a connection from the pool and sets search_path to the tenant
// Use this at the beginning of your request handlers
// Don't forget to defer conn.Release()!
func AcquireForTenant(ctx context.Context, tenant string) (*TenantConn, error) {
	if !isValidSchemaName(tenant) {
		return nil, fmt.Errorf("invalid tenant name: %s", tenant)
	}

	conn, err := defaultPgxPool.Acquire(ctx)
	if err != nil {
		return nil, err
	}

	// Set search_path for this connection (scoped to this connection's lifetime)
	_, err = conn.Exec(ctx, fmt.Sprintf("SET search_path TO %s", pgx.Identifier{tenant}.Sanitize()))
	if err != nil {
		conn.Release()
		return nil, fmt.Errorf("failed to set search_path: %w", err)
	}

	return &TenantConn{
		conn:   conn,
		tenant: tenant,
	}, nil
}

// getGlobalSQLFiles returns sorted list of SQL files from embedded global schema
func getGlobalSQLFiles() ([]string, error) {
	fsys, err := fs.Sub(embedGlobalSchema, "schema/global")
	if err != nil {
		return nil, err
	}

	entries, err := fs.ReadDir(fsys, ".")
	if err != nil {
		return nil, err
	}

	var sqlFiles []string
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		if strings.HasSuffix(entry.Name(), ".sql") {
			sqlFiles = append(sqlFiles, entry.Name())
		}
	}

	sort.Strings(sqlFiles)
	return sqlFiles, nil
}

// getTenantSQLFiles returns sorted list of SQL files from embedded tenant schema
func getTenantSQLFiles() ([]string, error) {
	fsys, err := fs.Sub(embedTenantSchema, "schema/tenant")
	if err != nil {
		return nil, err
	}

	entries, err := fs.ReadDir(fsys, ".")
	if err != nil {
		return nil, err
	}

	var sqlFiles []string
	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		if strings.HasSuffix(entry.Name(), ".sql") {
			sqlFiles = append(sqlFiles, entry.Name())
		}
	}

	sort.Strings(sqlFiles)
	return sqlFiles, nil
}

// isValidSchemaName validates that a schema name only contains safe characters
func isValidSchemaName(name string) bool {
	if name == "" {
		return false
	}
	for _, c := range name {
		if !((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '_') {
			return false
		}
	}
	return true
}
