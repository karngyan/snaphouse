-- name: CreateEvent :one
INSERT INTO events (created_by_user_id, updated_by_user_id, name, description, cover_image_url, share_uuid, passcode, created, updated)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;

-- name: GetEventByID :one
SELECT * FROM events
WHERE id = $1;

-- name: GetEventByShareUUID :one
SELECT * FROM events
WHERE share_uuid = $1;

-- name: ListEvents :many
SELECT * FROM events
ORDER BY created DESC
LIMIT $1 OFFSET $2;

-- name: ListEventsByUser :many
SELECT * FROM events
WHERE created_by_user_id = $1
ORDER BY created DESC
LIMIT $2 OFFSET $3;

-- name: UpdateEvent :one
UPDATE events
SET name = COALESCE(sqlc.narg('name'), name),
    description = COALESCE(sqlc.narg('description'), description),
    cover_image_url = COALESCE(sqlc.narg('cover_image_url'), cover_image_url),
    share_uuid = COALESCE(sqlc.narg('share_uuid'), share_uuid),
    passcode = COALESCE(sqlc.narg('passcode'), passcode),
    updated_by_user_id = COALESCE(sqlc.narg('updated_by_user_id'), updated_by_user_id),
    updated = $1
WHERE id = $2
RETURNING *;

-- name: DeleteEvent :exec
DELETE FROM events
WHERE id = $1;

-- name: CountEvents :one
SELECT COUNT(*) FROM events;

-- name: CountEventsByUser :one
SELECT COUNT(*) FROM events
WHERE created_by_user_id = $1;

-- name: SearchEvents :many
SELECT * FROM events
WHERE name ILIKE '%' || $1 || '%'
   OR description ILIKE '%' || $1 || '%'
ORDER BY created DESC
LIMIT $2 OFFSET $3;

