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
  followedCount int,
  followed_id int,
  followersCount int,
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
  follows_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS following (
  id int not null AUTO_INCREMENT,
  following_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS likes (
  id int not null AUTO_INCREMENT,
  users_id int,
  posts_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS images (
  id int not null AUTO_INCREMENT,
  image_url varchar(255),
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS hashtags (
  id int not null AUTO_INCREMENT,
  hashtag varchar(50),
  PRIMARY KEY (id)
);

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email, followedCount, followersCount)
VALUES ('randomuser', 'Tim R.', 'New York, NY', 'source.unsplash.com/1600x900/?featured/?man', 'abcdefg hijklmnop qrs tuv wxyz', 'tim@nowhere.com', 20, 200);

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email)
VALUES ('janeD123', 'Jane D.', 'Washington', 'source.unsplash.com/1600x900/?featured/?woman', 'text text text', 'jane@nowhere.com');

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email)
VALUES ('bananaman', 'A Banana', 'Fruit Aisle', 'source.unsplash.com/1600x900/?featured/?banana', 'I AM A BANANAAAAAAAA', 'notripe@overripe.com');

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email)
VALUES ('dontlisten', 'Bad Advice Mallard', 'Orlando, FL', 'source.unsplash.com/1600x900/?featured/?mallard', 'It isn''t illegal if the cops don''t see you.', 'quack@me.com');

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email)
VALUES ('someoneelse', 'A. Nonymous', 'Chicago', 'source.unsplash.com/1600x900/?featured/?symbol', 'lorem ipsum dolor sit amet', 'dhsdfgk@mcvdmnfnlfb.com');

INSERT INTO users (userHandle, userName, userLoc, userPhotoUrl, bio, email)
VALUES ('nyancat', 'Nyan Cat', 'Outer Space', 'source.unsplash.com/1600x900/?featured/?cat', 'Nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan', 'strawberry@poptart.com');

INSERT INTO posts (users_id, postLoc, body, photoUrl, likesCount)
VALUES (6, 'The Park', 'my cousin', 'source.unsplash.com/1600x900/?featured/?park', 500);
 
INSERT INTO posts (users_id, postLoc, body, photoUrl, likesCount)
VALUES (2, 'Hawaii', 'vacation', 'source.unsplash.com/1600x900/?featured/?island', 600);

INSERT INTO posts (users_id, postLoc, body, photoUrl, likesCount)
VALUES (3, 'here', 'om nom nom nom', 'source.unsplash.com/1600x900/?featured/?hotdog', 7000);

INSERT INTO posts (users_id, postLoc, body, photoUrl, likesCount)
VALUES (4, 'The Pond', 'Hmmmmm', 'source.unsplash.com/1600x900/?featured/?pond', 1);

INSERT INTO posts (users_id, postLoc, body, photoUrl, likesCount)
VALUES (5, 'kitchen', 'lol wut', 'source.unsplash.com/1600x900/?featured/?kitchen', 20);
CREATE TABLE IF NOT EXISTS login (
  id int not null AUTO_INCREMENT,
  username varchar(20),
  password varchar(20),
  PRIMARY KEY(id)
);
-- To run: open Terminal and start MySQL server:
-- mysql.server stop | then | mysql.server start
-- mysql -u root < server/schema.sql