-- name: CreateAlbum :one
INSERT INTO albums (event_id, created_by_user_id, updated_by_user_id, name, description, cover_image_url, is_public, share_uuid, passcode, created, updated)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;

-- name: GetAlbumByID :one
SELECT * FROM albums
WHERE id = $1;

-- name: GetAlbumByShareUUID :one
SELECT * FROM albums
WHERE share_uuid = $1;

-- name: ListAlbums :many
SELECT * FROM albums
ORDER BY created DESC
LIMIT $1 OFFSET $2;

-- name: ListAlbumsByEvent :many
SELECT * FROM albums
WHERE event_id = $1
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: ListPublicAlbumsByEvent :many
SELECT * FROM albums
WHERE event_id = $1 AND is_public = true
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: ListAlbumsByUser :many
SELECT * FROM albums
WHERE created_by_user_id = $1
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: UpdateAlbum :one
UPDATE albums
SET name = COALESCE(sqlc.narg('name'), name),
    description = COALESCE(sqlc.narg('description'), description),
    cover_image_url = COALESCE(sqlc.narg('cover_image_url'), cover_image_url),
    is_public = COALESCE(sqlc.narg('is_public'), is_public),
    share_uuid = COALESCE(sqlc.narg('share_uuid'), share_uuid),
    passcode = COALESCE(sqlc.narg('passcode'), passcode),
    updated_by_user_id = COALESCE(sqlc.narg('updated_by_user_id'), updated_by_user_id),
    updated = $1
WHERE id = $2
RETURNING *;

-- name: DeleteAlbum :exec
DELETE FROM albums
WHERE id = $1;

-- name: CountAlbums :one
SELECT COUNT(*) FROM albums;

-- name: CountAlbumsByEvent :one
SELECT COUNT(*) FROM albums
WHERE event_id = $1;

-- name: CountAlbumsByUser :one
SELECT COUNT(*) FROM albums
WHERE created_by_user_id = $1;

-- name: SearchAlbumsByEvent :many
SELECT * FROM albums
WHERE event_id = $1
  AND (name ILIKE '%' || $2 || '%' OR description ILIKE '%' || $2 || '%')
ORDER BY created DESC
LIMIT $3 OFFSET $4;

