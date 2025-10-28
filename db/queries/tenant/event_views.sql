-- name: CreateEventView :one
INSERT INTO event_views (event_id, ip_address, user_agent, referer, viewed_at)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetEventViewByID :one
SELECT * FROM event_views
WHERE id = $1;

-- name: ListEventViews :many
SELECT * FROM event_views
ORDER BY viewed_at DESC
LIMIT $1 OFFSET $2;

-- name: ListEventViewsByEvent :many
SELECT * FROM event_views
WHERE event_id = $1
ORDER BY viewed_at DESC
LIMIT $2 OFFSET $3;

-- name: ListEventViewsByIP :many
SELECT * FROM event_views
WHERE ip_address = $1
ORDER BY viewed_at DESC
LIMIT $2 OFFSET $3;

-- name: ListEventViewsByEventAndDateRange :many
SELECT * FROM event_views
WHERE event_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3
ORDER BY viewed_at DESC
LIMIT $4 OFFSET $5;

-- name: DeleteEventView :exec
DELETE FROM event_views
WHERE id = $1;

-- name: DeleteEventViewsByEvent :exec
DELETE FROM event_views
WHERE event_id = $1;

-- name: CountEventViews :one
SELECT COUNT(*) FROM event_views;

-- name: CountEventViewsByEvent :one
SELECT COUNT(*) FROM event_views
WHERE event_id = $1;

-- name: CountEventViewsByEventAndDateRange :one
SELECT COUNT(*) FROM event_views
WHERE event_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3;

-- name: CountUniqueIPsByEvent :one
SELECT COUNT(DISTINCT ip_address) FROM event_views
WHERE event_id = $1;

-- name: GetEventViewsGroupedByDay :many
SELECT DATE(TO_TIMESTAMP(viewed_at / 1000)) as day, COUNT(*) as views
FROM event_views
WHERE event_id = $1
  AND viewed_at >= $2
  AND viewed_at <= $3
GROUP BY day
ORDER BY day DESC;

-- name: GetTopEventsByViews :many
SELECT event_id, COUNT(*) as view_count
FROM event_views
GROUP BY event_id
ORDER BY view_count DESC
LIMIT $1;
