CREATE TABLE IF NOT EXISTS tenants
(
    id                   BIGSERIAL PRIMARY KEY,
    clerk_org_id         VARCHAR(255) UNIQUE NOT NULL,
    watermark_media_url  VARCHAR(512),
    watermark_opacity    DECIMAL(3, 2) DEFAULT 0.50,
    created              BIGINT               NOT NULL,
    updated              BIGINT               NOT NULL
);

CREATE INDEX IF NOT EXISTS tenants_clerk_org_id_idx ON tenants (clerk_org_id);
