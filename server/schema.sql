CREATE DATABASE IF NOT EXISTS photostory;
USE photostory;
CREATE TABLE IF NOT EXISTS users (
  id int not null AUTO_INCREMENT,
  user_id int not null,
  username varchar(25) not null,
  photo_url varchar(100),
  bio varchar(500),
  email varchar(50) not null,
  followed_id int not null,
  follows_id int not null,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS posts (
  id int not null AUTO_INCREMENT,
  user_id int not null,
  likes int,
  bio varchar(500),
  photo_url varchar(100),
  located varchar(100),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS comments (
  id int not null AUTO_INCREMENT,
  text varchar(200),
  user_id int not null,
  post_id int not null,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS followers (
  id int not null AUTO_INCREMENT,
  follows_id int,
  PRIMARY KEY (id)
);

-- run this command in the termnal after mysql is running (mysql.server stop | then | mysql.server start)
-- mysql -u root < server/schema.sql