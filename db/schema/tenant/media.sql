CREATE TABLE IF NOT EXISTS media
(
    id          BIGSERIAL PRIMARY KEY,
    album_id    BIGINT       NOT NULL,
    url         VARCHAR(512) NOT NULL,
    media_type  VARCHAR(20)  NOT NULL,
    file_size   BIGINT,
    created     BIGINT       NOT NULL,
    updated     BIGINT       NOT NULL
);

CREATE INDEX IF NOT EXISTS media_album_id_idx ON media (album_id);
