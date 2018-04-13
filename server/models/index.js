const db = require('../DB');

const Models = {

  login: (req, res, cb) => {
    var username = req.query.username;
    var password = req.query.password;
    var queryStr = `select username from login where username = ${JSON.stringify(username)} AND password = ${JSON.stringify(password)}`;
    db.connection.query(queryStr, function(err, results) {
      if (results.length > 0) {
        results = "Welcome";
      } else {
        results = "Incorrect login";
      }
      cb(err, results);
    })
  },

  posts: {
    all: function(cb) {
      var queryStr = 'select * from posts';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    create: function (params, cb) {
      var queryStr = 'insert into posts (users_id, body, postLoc, photoUrl) values (?, ?, ?, ?)';
      db.query(queryStr, Object.values(params), function(err, results) {
        cb(err, results);
      });
    },
    delete: function(cb) {
      var queryStr = 'delete from posts where posts_id = ?';
      db.query(queryStr, params, function(err, results) {
        cb(err, results)
      });
    },
    // find: function (cb) {
    //   var queryStr = 'select posts.id, posts.body, posts.photoUrl, posts.postLoc from \
    //                   posts left outer join users on (posts.users_id = users.id) \
    //                   order by posts.id desc';
    //   db.query(queryStr, function(err, results) {
    //     cb(err, results);
    //   });
    // },
    // like: function(cb) {
    //   var queryStr = 'select * from posts where posts.id = ?), ?)';
    //   // to do
    //   db.query(queryStr, params, function(err, results) {
    //     cb(err, results)
    //   });
    // },
    // unlike: function(cb) {
    //   var queryStr = 'select * from posts where posts.id = ?), ?)';
    //   db.query(queryStr, params, function(err, results) {
    //     cb(err, results)
    //   });
    // },
  },
  users: {
    create: function (params, cb) {
      var queryStr = 'insert into users (userHandle, userName, userLoc, photoUrl, bio, email) values (?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    find: function (params, cb) {
      var queryStr = 'select from users where userHandle = ?';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    // follow: function(params, cb) {
    //   var queryStr = 'select * from users where users.id = ? limit 1), ?)';
    //   db.query(queryStr, params, function(err, results) {
    //     cb(err, results);
    //   });
    // },
    // unfollow: function(params, cb) {
    //   var queryStr = 'select * from users where users.id = ? limit 1), ?)';
    //   db.query(queryStr, params, function(err, results) {
    //     cb(err, results);
    //   });
    // },
  }
};

module.exports = Models;