CREATE TABLE IF NOT EXISTS users
(
    id             BIGSERIAL PRIMARY KEY,
    clerk_user_id  VARCHAR(255) UNIQUE NOT NULL,
    created        BIGINT               NOT NULL,
    updated        BIGINT               NOT NULL
);

CREATE INDEX IF NOT EXISTS users_clerk_user_id_idx ON users (clerk_user_id);

