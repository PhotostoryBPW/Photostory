CREATE DATABASE IF NOT EXISTS photostory;
USE photostory;
CREATE TABLE IF NOT EXISTS users (
  id int not null AUTO_INCREMENT,
  userHandle varchar(25) not null,
  userName varchar(25) not null,
  userLoc varchar(50),
  userPhotoUrl varchar(255), -- temporary - this should exist in a separate table eventually and be changed to and ID foreign key sitch
  bio varchar(500),
  email varchar(50) not null,
  postCount int default 0 not null,
  followedCount int default 0 not null,
  followed_id int,
  followCount int default 0 not null,
  follows_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS posts (
  id int not null AUTO_INCREMENT,
  users_id int not null,
  postLoc varchar(50),
  body varchar(500),
  photoUrl varchar(100), -- temporary - this should exist in a separate table eventually and be changed to and ID foreign key sitch
  parent_id int,
  likesCount int,
  likes_id int,
  createdAt bigint,
  filt varchar(50),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS followers (
  id int not null AUTO_INCREMENT,
  users_id int,
  follows_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS likes (
  id int not null AUTO_INCREMENT,
  users_id int,
  posts_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS hashtags (
  id int not null AUTO_INCREMENT,
  hashtag varchar(50),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS notifications (
  id int not null AUTO_INCREMENT,
  users_id int, -- user receiving the notification
  posts_id int, -- the comment they receive in their notification inbox
  userLiked_id int, -- the user that liked the post
  follows_id int, -- the user that started following them
  note_time bigint, -- the time of the notification
  viewed int default 0 not null, -- has the post been viewed? 0 is no, 1 is yes 
  noteType int, -- 0 = comment, 1 = follow, 2 = like
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS login (
  id int not null AUTO_INCREMENT,
  username varchar(20),
  password varchar(100),
  PRIMARY KEY(id)
);
-- To run: open Terminal and start MySQL server:
-- mysql.server stop | then | mysql.server start
-- mysql -u root < server/schema.sql
