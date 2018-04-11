CREATE DATABASE IF NOT EXISTS photostory;
USE photostory;
CREATE TABLE IF NOT EXISTS users (
  id int not null AUTO_INCREMENT,
  userHandle int not null,
  userName varchar(25) not null,
  userLoc varchar(50),
  photoUrl varchar(100),
  bio varchar(500),
  email varchar(50) not null,
  followedCount int,
  followed_id int not null,
  followersCount int,
  follows_id int not null,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS posts (
  id int not null AUTO_INCREMENT,
  users_id int not null,
  postLoc varchar(50),
  body varchar(500),
  photoUrl varchar(100),
  comments_id int not null,
  likesCount int,
  likes_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS comments (
  id int not null AUTO_INCREMENT,
  body varchar(200),
  users_id int not null,
  posts_id int not null,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS followers (
  id int not null AUTO_INCREMENT,
  follows_id int,
  PRIMARY KEY (id)
);

--- To run: open Terminal and start MySQL server:
--- mysql.server stop | then | mysql.server start
--- mysql -u root < server/schema.sql