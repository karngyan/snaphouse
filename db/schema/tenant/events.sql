CREATE TABLE IF NOT EXISTS events
(
    id                  BIGSERIAL PRIMARY KEY,
    created_by_user_id  BIGINT,
    updated_by_user_id  BIGINT,
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    cover_image_url     VARCHAR(512),
    share_uuid          VARCHAR(36) UNIQUE,
    passcode            VARCHAR(255),
    created             BIGINT       NOT NULL,
    updated             BIGINT       NOT NULL
);

CREATE INDEX IF NOT EXISTS events_share_uuid_idx ON events (share_uuid);
