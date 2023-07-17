drop table if exists Songs
drop table if exists Artists
go
create table Artists(
	artistId int identity primary key,
	artistName varchar(30),
	popularity int
)