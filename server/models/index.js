var db = require('../db');

const Models = {

  posts: {
    delete: function(cb) {
      var queryStr = 'select * from posts where posts.id = ?), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
    find: function (cb) {
      var queryStr = 'select posts.id, posts.text, posts.photo, posts.location from \
                      posts left outer join users on (posts.userId = users.userId) \
                      order by posts.id desc';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    like: function(cb) {
      var queryStr = 'select * from posts where posts.id = ?), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
    new: function (params, cb) {
      var queryStr = 'insert into posts(userId, text, photo, location) value (?, \
                      select userId from users where userId = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    unlike: function(cb) {
      var queryStr = 'select * from posts where posts.id = ?), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
  },
  users: {
    find: function (params, cb) {
      var queryStr = 'select * from users';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    new: function (params, cb) {
      var queryStr = 'insert into users(username) values (?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    follow: function(params, cb) {
      var queryStr = 'select * from users where userId = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    unfollow: function(params, cb) {
      var queryStr = 'select * from users where userId = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
  }
  };