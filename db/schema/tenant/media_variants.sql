CREATE TABLE IF NOT EXISTS media_variants
(
    id           BIGSERIAL PRIMARY KEY,
    media_id     BIGINT       NOT NULL,
    variant_type VARCHAR(50)  NOT NULL,
    url          VARCHAR(512) NOT NULL,
    width        INTEGER,
    height       INTEGER,
    file_size    BIGINT,
    created      BIGINT       NOT NULL
);

CREATE INDEX IF NOT EXISTS media_variants_media_id_idx ON media_variants (media_id);
CREATE INDEX IF NOT EXISTS media_variants_variant_type_idx ON media_variants (variant_type);
