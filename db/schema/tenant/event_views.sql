CREATE TABLE IF NOT EXISTS event_views
(
    id          BIGSERIAL PRIMARY KEY,
    event_id    BIGINT NOT NULL,
    ip_address  VARCHAR(45),
    user_agent  TEXT,
    referer     VARCHAR(512),
    viewed_at   BIGINT NOT NULL
);

CREATE INDEX IF NOT EXISTS event_views_event_id_idx ON event_views (event_id);
CREATE INDEX IF NOT EXISTS event_views_viewed_at_idx ON event_views (viewed_at);
CREATE INDEX IF NOT EXISTS event_views_ip_address_idx ON event_views (ip_address);
