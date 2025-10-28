CREATE TABLE IF NOT EXISTS album_views
(
    id          BIGSERIAL PRIMARY KEY,
    album_id    BIGINT NOT NULL,
    ip_address  VARCHAR(45),
    user_agent  TEXT,
    referer     VARCHAR(512),
    viewed_at   BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS album_views_album_id_idx ON album_views (album_id);
CREATE INDEX IF NOT EXISTS album_views_ip_address_idx ON album_views (ip_address);
