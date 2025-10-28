-- name: CreateUser :one
INSERT INTO users (clerk_user_id, created, updated)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1;

-- name: GetUserByClerkUserID :one
SELECT * FROM users
WHERE clerk_user_id = $1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY created DESC
LIMIT $1 OFFSET $2;

-- name: UpdateUser :one
UPDATE users
SET updated = $1
WHERE id = $2
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: CountUsers :one
SELECT COUNT(*) FROM users;

