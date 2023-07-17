drop table if exists Songs
drop table if exists Artists
go
create table Artists(
	artistId int primary key,
	artistName varchar(30),
	popularity int
)