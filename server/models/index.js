var db = require('../DB');

const Models = {

  posts: {
    delete: function(cb) {
      var queryStr = 'select * from posts where posts.id = ?), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
    find: function (cb) {
      var queryStr = 'select posts.id, posts.body, posts.photoUrl, posts.postLoc from \
                      posts left outer join users on (posts.users_id = users.id) \
                      order by posts.id desc';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    like: function(cb) {
      var queryStr = 'select * from posts where posts.id = ?), ?)';
      // to do
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
    create: function (params, cb) {
      var queryStr = 'insert into posts(users_id, body, photoUrl, postLoc) value (?, \
                      select * from users where users.id = ? limit 1), ?)';
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
      var queryStr = 'insert into users(userName) values (?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    follow: function(params, cb) {
      var queryStr = 'select * from users where users.id = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    unfollow: function(params, cb) {
      var queryStr = 'select * from users where users.id = ? limit 1), ?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
  }
  };

  module.exports.Models = Models;