-- name: CreateMedia :one
INSERT INTO media (album_id, url, media_type, file_size, created, updated)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetMediaByID :one
SELECT * FROM media
WHERE id = $1;

-- name: ListMedia :many
SELECT * FROM media
ORDER BY created DESC
LIMIT $1 OFFSET $2;

-- name: ListMediaByAlbum :many
SELECT * FROM media
WHERE album_id = $1
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: ListMediaByAlbumAndType :many
SELECT * FROM media
WHERE album_id = $1 AND media_type = $2
ORDER BY created DESC
LIMIT $3 OFFSET $4;

-- name: UpdateMedia :one
UPDATE media
SET url = COALESCE(sqlc.narg('url'), url),
    media_type = COALESCE(sqlc.narg('media_type'), media_type),
    file_size = COALESCE(sqlc.narg('file_size'), file_size),
    updated = $1
WHERE id = $2
RETURNING *;

-- name: DeleteMedia :exec
DELETE FROM media
WHERE id = $1;

-- name: DeleteMediaByAlbum :exec
DELETE FROM media
WHERE album_id = $1;

-- name: CountMedia :one
SELECT COUNT(*) FROM media;

-- name: CountMediaByAlbum :one
SELECT COUNT(*) FROM media
WHERE album_id = $1;

-- name: CountMediaByAlbumAndType :one
SELECT COUNT(*) FROM media
WHERE album_id = $1 AND media_type = $2;

-- name: GetTotalMediaSizeByAlbum :one
SELECT COALESCE(SUM(file_size), 0) as total_size
FROM media
WHERE album_id = $1;

-- name: GetMediaTypeStats :many
SELECT media_type, COUNT(*) as count, COALESCE(SUM(file_size), 0) as total_size
FROM media
WHERE album_id = $1
GROUP BY media_type;

