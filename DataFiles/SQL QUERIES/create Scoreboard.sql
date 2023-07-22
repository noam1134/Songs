drop table if exists ScoreBoard
go
CREATE TABLE Scoreboard(
    id INT IDENTITY (1,1) PRIMARY KEY,
    score INT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES MusicUsers(id)
);