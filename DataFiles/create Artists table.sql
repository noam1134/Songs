drop table if exists Artists
go
create table Artists(
	artistId int identity(1,1) primary key,
	artistName varchar(30),
	popularity int
)