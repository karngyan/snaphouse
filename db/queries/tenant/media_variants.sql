-- name: CreateMediaVariant :one
INSERT INTO media_variants (media_id, variant_type, url, width, height, file_size, created)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetMediaVariantByID :one
SELECT * FROM media_variants
WHERE id = $1;

-- name: GetMediaVariantByMediaAndType :one
SELECT * FROM media_variants
WHERE media_id = $1 AND variant_type = $2
LIMIT 1;

-- name: ListMediaVariantsByMedia :many
SELECT * FROM media_variants
WHERE media_id = $1
ORDER BY created DESC;

-- name: ListMediaVariantsByType :many
SELECT * FROM media_variants
WHERE variant_type = $1
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: DeleteMediaVariant :exec
DELETE FROM media_variants
WHERE id = $1;

-- name: DeleteMediaVariantsByMedia :exec
DELETE FROM media_variants
WHERE media_id = $1;

-- name: DeleteMediaVariantsByMediaAndType :exec
DELETE FROM media_variants
WHERE media_id = $1 AND variant_type = $2;

-- name: CountMediaVariants :one
SELECT COUNT(*) FROM media_variants;

-- name: CountMediaVariantsByMedia :one
SELECT COUNT(*) FROM media_variants
WHERE media_id = $1;

-- name: GetTotalVariantsSizeByMedia :one
SELECT COALESCE(SUM(file_size), 0) as total_size
FROM media_variants
WHERE media_id = $1;

-- name: GetVariantTypeStats :many
SELECT variant_type, COUNT(*) as count, COALESCE(SUM(file_size), 0) as total_size
FROM media_variants
GROUP BY variant_type;

