-- name: CreateAlbumView :one
INSERT INTO album_views (album_id, ip_address, user_agent, referer, viewed_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetAlbumViewByID :one
SELECT * FROM album_views
WHERE id = $1;

-- name: ListAlbumViews :many
SELECT * FROM album_views
ORDER BY viewed_at DESC
LIMIT $1 OFFSET $2;

-- name: ListAlbumViewsByAlbum :many
SELECT * FROM album_views
WHERE album_id = $1
ORDER BY viewed_at DESC
LIMIT $2 OFFSET $3;

-- name: ListAlbumViewsByIP :many
SELECT * FROM album_views
WHERE ip_address = $1
ORDER BY viewed_at DESC
LIMIT $2 OFFSET $3;

-- name: ListAlbumViewsByAlbumAndDateRange :many
SELECT * FROM album_views
WHERE album_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3
ORDER BY viewed_at DESC
LIMIT $4 OFFSET $5;

-- name: DeleteAlbumView :exec
DELETE FROM album_views
WHERE id = $1;

-- name: DeleteAlbumViewsByAlbum :exec
DELETE FROM album_views
WHERE album_id = $1;

-- name: CountAlbumViews :one
SELECT COUNT(*) FROM album_views;

-- name: CountAlbumViewsByAlbum :one
SELECT COUNT(*) FROM album_views
WHERE album_id = $1;

-- name: CountAlbumViewsByAlbumAndDateRange :one
SELECT COUNT(*) FROM album_views
WHERE album_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3;

-- name: CountUniqueIPsByAlbum :one
SELECT COUNT(DISTINCT ip_address) FROM album_views
WHERE album_id = $1;

-- name: GetAlbumViewsGroupedByDay :many
SELECT DATE(TO_TIMESTAMP(viewed_at / 1000)) as day, COUNT(*) as views
FROM album_views
WHERE album_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3
GROUP BY day
ORDER BY day DESC;

-- name: GetTopAlbumsByViews :many
SELECT album_id, COUNT(*) as view_count
FROM album_views
GROUP BY album_id
ORDER BY view_count DESC
LIMIT $1;

