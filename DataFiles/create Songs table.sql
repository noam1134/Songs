drop table if exists Songs

CREATE TABLE Songs (
    songId INT PRIMARY KEY,
    songName VARCHAR(255),
    lyrics TEXT,
    link VARCHAR(255),
    artistId INT
);
