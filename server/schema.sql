CREATE DATABASE IF NOT EXISTS photostory;
USE photostory;
CREATE TABLE IF NOT EXISTS users (
  id int not null AUTO_INCREMENT,
  userHandle varchar(25),
  userName varchar(25) not null,
  userLoc varchar(50),
  photoUrl varchar(100),
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
  photoUrl varchar(100),
  comments_id int,
  likesCount int,
  likes_id int,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS comments (
  id int not null AUTO_INCREMENT,
  body varchar(200),
  users_id int,
  posts_id int,
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

--- Dummy data
---------------------

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('randomuser', 'Tim R.', 'New York, NY', 'https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg', 'abcdefg hijklmnop qrs tuv wxyz', 'tim@nowhere.com');

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('janeD123', 'Jane D.', 'Washington', 'http://i.imgur.com/FsaErgQ.jpg', 'text text text', 'jane@nowhere.com');

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('bananaman', 'A Banana', 'Fruit Aisle', 'http://i.imgur.com/4Qcudbo.png', 'I AM A BANANAAAAAAAA', 'notripe@overripe.com');

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('dontlisten', 'Bad Advice Mallard', 'Orlando, FL', 'http://i0.kym-cdn.com/photos/images/original/000/449/182/afe.jpg', 'It isn''t illegal if the cops don''t see you.', 'quack@me.com');

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('someoneelse', 'A. Nonymous', 'Chicago', 'http://news.unn.net/news/photo/201704/172721_53753_3145.jpg', 'lorem ipsum dolor sit amet', 'dhsdfgk@mcvdmnfnlfb.com');

INSERT INTO users (userHandle, userName, userLoc, photoUrl, bio, email)
VALUES ('nyancat', 'Nyan Cat', 'Outer Space', 'https://pbs.twimg.com/profile_images/2370446440/6e2jwf7ztbr5t1yjq4c5.jpeg', 'Nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan', 'strawberry@poptart.com');

--------------------

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (6, 'The Park', 'my cousin', 'https://wallpaperbrowse.com/media/images/pictures-14.jpg');
 
INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (2, 'Hawaii', 'vacation', 'https://wallpaperbrowse.com/media/images/pictures-8.jpg');

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (3, 'here', 'om nom nom nom', 'https://wallpaperbrowse.com/media/images/2a565805f94d024f305f79fcdfa983c4--walpaper-iphone-cute-wallpapers.jpg');

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (4, 'The Pond', 'Hmmmmm', 'https://i.imgur.com/ZF8edvO.png');

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (5, 'kitchen', 'lol wut', 'https://cdn.shopify.com/s/files/1/1829/4817/products/UVbitingpeargraphic.jpg');

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (3, 'there', 'MAH FRIENDZ', 'https://wallpaperbrowse.com/media/images/7-1.jpg');

INSERT INTO posts (users_id, postLoc, body, photoUrl)
VALUES (2, 'at home', 'eeeeeeeek!', 'https://wallpaperbrowse.com/media/images/interesting-pictures-25.jpg');
