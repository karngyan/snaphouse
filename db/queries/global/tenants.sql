-- name: CreateTenant :one
INSERT INTO tenants (clerk_org_id, watermark_media_url, watermark_opacity, created, updated)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetTenantByID :one
SELECT * FROM tenants
WHERE id = $1;

-- name: GetTenantByClerkOrgID :one
SELECT * FROM tenants
WHERE clerk_org_id = $1;

-- name: ListTenants :many
SELECT * FROM tenants
ORDER BY created DESC
LIMIT $1 OFFSET $2;

-- name: UpdateTenant :one
UPDATE tenants
SET watermark_media_url = COALESCE(sqlc.narg('watermark_media_url'), watermark_media_url),
    watermark_opacity = COALESCE(sqlc.narg('watermark_opacity'), watermark_opacity),
    updated = $1
WHERE id = $2
RETURNING *;

-- name: DeleteTenant :exec
DELETE FROM tenants
WHERE id = $1;

-- name: CountTenants :one
SELECT COUNT(*) FROM tenants;

