drop table if exists MusicUsers

create table MusicUsers(
	id int identity primary key,
	firstName varchar(30),
	lastname varchar(30),
	email varchar(50),
	userPassword varchar(50),
	phone varchar(30)
)