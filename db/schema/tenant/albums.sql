CREATE TABLE IF NOT EXISTS albums
(
    id                  BIGSERIAL PRIMARY KEY,
    event_id            BIGINT       NOT NULL,
    created_by_user_id  BIGINT,
    updated_by_user_id  BIGINT,
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    cover_image_url     VARCHAR(512),
    is_public           BOOLEAN DEFAULT true,
    share_uuid          VARCHAR(36) UNIQUE,
    passcode            VARCHAR(255),
    created             BIGINT       NOT NULL,
    updated             BIGINT       NOT NULL
);

CREATE INDEX IF NOT EXISTS albums_event_id_idx ON albums (event_id);
CREATE INDEX IF NOT EXISTS albums_share_uuid_idx ON albums (share_uuid);

