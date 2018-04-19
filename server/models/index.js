const db = require('../DB');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const Models = {

  signup: (req, res, cb) => {
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;
    var email = req.body.email;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      var queryToSeeIfUserExists = `select username from login where username = ${JSON.stringify(username)}`;
      db.query(queryToSeeIfUserExists, (err, results) => {
        if (results.length < 1) {
          var query = `INSERT INTO login (username, password) VALUES (${JSON.stringify(username)}, ${JSON.stringify(hash)})`;
          db.query(query, (err, results) => {
            var query = `INSERT INTO users (userHandle, userName, email) VALUES (${JSON.stringify(username)}, ${JSON.stringify(fullname)}, ${JSON.stringify(email)})`;
            db.query(query, (err, results) => {
              if (err) {
                throw err;
              };
              cb(null, 'signed up');
            });
          })
        } else {
          cb(err, 'username already exists');
        }
      })
    });
  },

  posts: {
    all: function(cb) {
      var queryStr = 'select p.*, u.userHandle, u.userName, u.userLoc, u.userPhotoUrl, u.bio, u.email, u.followedCount, u.followed_id, u.followCount, u.follows_id  from posts as p inner join users as u on p.users_id=u.id order by -createdAt';
      db.query(queryStr, function(err, results) {
        // console.log(results);
        cb(err, results);
      });
    },
    friends: function(cb) {
      var queryStr = 'select * from posts left join users on posts.users_id=users.id';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    create: function (params, user, cb) {
      console.log(params);
      console.log('this is user', user);
      var queryStr = 'select id from users where users.userHandle=?'
      db.query(queryStr, user, function(err, result) {
        console.log('this is the result of the query for user id: ', result[0].id);
        params.users_id = result[0].id;
        console.log('this is params after updating the user id: ', params);
        var queryStr = 'insert into posts (users_id, body, postLoc, photoUrl, createdAt, filt, likesCount) values (?, ?, ?, ?, ?, ?, 0)';
        db.query(queryStr, Object.values(params), function(err, results) {
          cb(err, results);
        });
      })
    },
    comment: function (params, user, cb) {
      console.log(params);
      console.log('this is user on comment', user);
      var queryStr = 'select id from users where users.userHandle=?'
      db.query(queryStr, user, function(err, result) {
        console.log('this is the result of the query for user id on comment: ', result[0].id);
        params.users_id = result[0].id;
        console.log('this is params after updating the user id on comment: ', params);
        var queryStr = 'insert into posts (users_id, body, postLoc, createdAt, filt, parent_id, likesCount) values (?, ?, ?, ?, ?, ?, 0)';
        db.query(queryStr, Object.values(params), function(err, results) {
          cb(err, results);
        });
      })
    },
    delete: function(cb) {
      var queryStr = 'delete from posts where posts_id = ?';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    like: function(data, user, cb) {
      var queryStr = 'select * from users where users.userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        var queryStr = `insert into likes (posts_id, users_id) values (${Object.keys(data)[0]}, ${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          cb(err, results);
        });
      });
    },
    likes: function(params, user, cb) {
      var queryStr = `select * from likes inner join users on likes.users_id = users.id where users.userHandle=${JSON.stringify(user)}`;
      db.query(queryStr, Object.values(params), function(err, results) {
        cb(err, results);
      });
    },
    unlike: function(data, user, cb) {
      var queryStr = 'select * from users where users.userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        var queryStr = `delete from likes where posts_id=(${Object.keys(data)[0]}) and users_id=(${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          cb(err, results);
        });
      });
    },
    like: function(data, user, cb) {
      var queryStr = 'select * from users where users.userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        var queryStr = `insert into likes (posts_id, users_id) values (${Object.keys(data)[0]}, ${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          cb(err, results);
        });
      });
    },
    likes: function(params, user, cb) {
      var queryStr = `select * from likes inner join users on likes.users_id = users.id where users.userHandle=${JSON.stringify(user)}`;
      db.query(queryStr, Object.values(params), function(err, results) {
        cb(err, results);
      });
    },
    unlike: function(data, user, cb) {
      var queryStr = 'select * from users where users.userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        var queryStr = `delete from likes where posts_id=(${Object.keys(data)[0]}) and users_id=(${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          cb(err, results);
        });
      });
    },
    mine: function(params, cb) {
      console.log(params);
      var queryStr = 'select * from posts inner join users on posts.users_id = users.id where users.userHandle=(?)';
      db.query(queryStr, Object.values(params), function(err, results) {
        console.log('mine', results)
        cb(err, results);
      });
    },
  },
  users: {
    create: function (params, cb) {
      var queryStr = 'insert into users (userHandle, userName, userLoc, photoUrl, bio, email) values (?)';
      db.query(queryStr, params, function(err, results) {
        cb(err, results);
      });
    },
    find: function (params, cb) {
      var queryStr = 'select * from users inner join posts on users.id = posts.users_id where userHandle=(?)';
      db.query(queryStr, Object.values(params), function(err, results) {
        cb(err, results);
      });
    },
    info: function (params, cb) {
      var queryStr = 'select * from users where userHandle=(?)';
      db.query(queryStr, Object.values(params), function(err, results) {
        cb(err, results[0]);
      });
    },
    follow: function (follows_id, user, cb) {
      var queryStr = 'select id from users where userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        if (err) {
          cb(err);
        }
        var params = [results[0].id, Object.keys(follows_id)[0]]
        queryStr = 'select * from followers where users_id=? and follows_id=?'
        console.log([results[0].id, Object.keys(follows_id)[0]]);
        db.query(queryStr, params, (err, results) => {
          if (err) {
            cb(err);
          }
          if (!results.length) {
          queryStr = 'insert into followers (users_id, follows_id) values (?,?)';
          db.query(queryStr, params, function(err, results) {
            if (err) {
              cb(err)
            }
            console.log('follow added to followers db')
            queryStr = 'update users set followCount = followCount + 1 where id=?'
            db.query(queryStr, params[0], (err, results) => {
              if (err) {
                cb(err)
              }
              console.log('incremented followCount for userID = ', params[0])
              queryStr = 'update users set followedCount = followedCount + 1 where id=?'
              db.query(queryStr, params[1], (err, results) => {
                if (err) {
                  cb(err)
                }
                console.log('incremented followedCount for userID = ', params[1])
                cb(null, results);
              })
            })
          });
        } else {
          console.log('this follow exists, now lets delete it')
          queryStr = 'delete from followers where users_id=? and follows_id=?'
          db.query(queryStr, params, (err, result) => {
            if (err) {
              cb(err);
            }
            console.log('follow deleted from followers db')
            queryStr = 'update users set followCount = followCount - 1 where id=?'
            db.query(queryStr, params[0], (err, results) => {
              if (err) {
                cb(err)
              }
              console.log('decremented followCount for userID = ', params[0])
              queryStr = 'update users set followedCount = followedCount - 1 where id=?'
              db.query(queryStr, params[1], (err, results) => {
                if (err) {
                  cb(err)
                }
                console.log('decremented followedCount for userID = ', params[1])
                cb(null, results);
              })
            })
          })
        }
        })
      });
    },
    userprofileinfo: function (params, cb) {
      var queryStr = `select * from users where userHandle = ${JSON.stringify(params)}`;
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, results);
      });
    },
    updatefullname: function(params, newName, cb) {
      var queryStr = `update users set userName=${JSON.stringify(newName.fullname)} where userHandle=${JSON.stringify(params)}`;
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, newName);
      })
    },
    updatebio: function(params, newBio, cb) {
      var queryStr = `update users set bio=${JSON.stringify(newBio.bio)} where userHandle=${JSON.stringify(params)}`;
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, newBio);
      })
    },
    updateemail: function(params, newEmail, cb) {
      console.log(newEmail);
      var queryStr = `update users set email=${JSON.stringify(newEmail.email)} where userHandle=${JSON.stringify(params)}`;
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, newEmail);
      })
    },
    updateprofilepic: function(params, newProfilePic, cb) {
      console.log(newProfilePic);
      var queryStr = `update users set userPhotoUrl=${JSON.stringify(newProfilePic.userPhotoUrl)} where userHandle=${JSON.stringify(params)}`;
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, newProfilePic);
      })

    }
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

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

function authenticationMiddleware() {

  return (req, res, next) => {
    console.log(`
      req.session.passport.user: ${JSON.
      stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.status(200).send('inactive');
  }
}
module.exports = Models;


// db.query('SELECT LAST_INSERT_ID() as id', function(err, results, fields) {
//   if (err) throw error;
//   console.log(results[0]);
//    req.login(results[0], function(err) {
//      cb(err, 'signed up');
//    })
//   keeping this code for future implementation of login on signup
//   cb(err, 'signed up');
// })