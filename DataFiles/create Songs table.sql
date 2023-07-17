DROP TABLE IF EXISTS Songs;
go

CREATE TABLE Songs (
    songId INT IDENTITY (1,1) PRIMARY KEY,
    songName VARCHAR(255),
    lyrics VARCHAR(MAX),
    link VARCHAR(255),
    artistId INT,
    FOREIGN KEY (artistId) REFERENCES Artists(artistId)
);
