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
    var userPhotoUrl = req.body.userPhotoUrl;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      var queryToSeeIfUserExists = `select username from login where username = ${JSON.stringify(username)}`;
      db.query(queryToSeeIfUserExists, (err, results) => {
        if (results.length < 1) {
          var query = `INSERT INTO login (username, password) VALUES (${JSON.stringify(username)}, ${JSON.stringify(hash)})`;
          db.query(query, (err, results) => {
            var query = `INSERT INTO users (userHandle, userName, userPhotoUrl, email) VALUES (${JSON.stringify(username)}, ${JSON.stringify(fullname)}, ${JSON.stringify(userPhotoUrl)}, ${JSON.stringify(email)})`;
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
    all: function(currentUser, cb) {
      var queryStr = 'select p.*, u.userHandle, u.userName, u.userLoc, u.userPhotoUrl, u.bio, u.email, u.followedCount, u.followed_id, u.followCount, u.follows_id  from posts as p inner join users as u on p.users_id=u.id order by -createdAt';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },

    following: function(currentUser, cb) {
      var currentUserId;
      var userIdQueryStr = `select users.id from users where userHandle=${JSON.stringify(currentUser)}`;
      db.query(userIdQueryStr, (err, results) => {
        currentUserId = results[0].id;
        var followsIdQueryStr = `select follows_id from followers where users_id=${currentUserId}`;
        db.query(followsIdQueryStr, (err, results) => {
          var postIdList = [];
          for (var i = 0; i < results.length; i++) {
            postIdList.push(results[i].follows_id);
          }
          postIdList.push(currentUserId);
          var postIdString = postIdList.join(",");
          postIdString = ("(" + postIdString + ")");
          var ohMyAnotherQuery = `select p.* from posts as p inner join users as u on p.users_id=u.id where users_id in ${postIdString} || users_id = ${currentUserId} order by createdAt`;
          db.query(ohMyAnotherQuery, (err, results) => {
            var usersIdList = [];
            var idList = [];
            if (results !== undefined) {
              for (var i = 0; i < results.length; i++) {
                usersIdList.push(results[i].users_id);
                idList.push(results[i].id);
              }
            }
            if (usersIdList.length === 0) {
              usersIdList.push(0);
            }
            if (idList.length === 0) {
              idList.push(0);
            }
            usersIdString = usersIdList.join(",");
            usersIdString = ("(" + usersIdString + ")");
            idString = idList.join(",");
            idString = ("(" + idString + ")");
            var queryStr = `select p.*, u.userHandle, u.userName, u.userLoc, u.userPhotoUrl, u.bio, u.email, u.followedCount, u.followed_id, u.followCount, u.follows_id  from posts as p inner join users as u on p.users_id=u.id where u.id in ${usersIdString} || parent_id in ${idString} order by -createdAt`;
            db.query(queryStr, (err, results) => {
            cb(err, results);
            });
          });
        })
      });
    },

    friends: function(cb) {
      var queryStr = 'select * from posts left join users on posts.users_id=users.id';
      db.query(queryStr, function(err, results) {
        cb(err, results);
      });
    },
    create: function (params, user, cb) {
      var queryStr = 'select id from users where users.userHandle=?'
      db.query(queryStr, user, function(err, result) {
        console.log('this is the result of the query for user id: ', result[0].id);
        params.users_id = result[0].id;
        console.log('this is params after updating the user id: ', params);
        var queryStr = 'insert into posts (users_id, body, postLoc, photoUrl, createdAt, filt, likesCount) values (?, ?, ?, ?, ?, ?, 0)';
        db.query(queryStr, Object.values(params), function(err, results) {
          queryStr = 'update users set postCount = postCount + 1 where id =?';
          db.query(queryStr, params.users_id, (err, results) => {
            cb(err, results);
          });
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
    like: function(data, user, cb) {console.log(data, 'this is the data on a like model');
      var queryStr = 'select * from users where users.userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        var posts_id = Object.keys(data)[0]
        console.log('this is the posts_id we are liking', posts_id)
        var queryStr = `insert into likes (posts_id, users_id) values (${posts_id}, ${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          queryStr = 'update posts set likesCount = likesCount + 1 where id =?'
          db.query(queryStr, posts_id, (err, results) => {
            cb(err, results);
          })
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
        var posts_id = Object.keys(data)[0]
        var queryStr = `delete from likes where posts_id=(${posts_id}) and users_id=(${results[0].id})`;
        db.query(queryStr, data, function(err, results) {
          queryStr = 'update posts set likesCount = likesCount - 1 where id =?'
          db.query(queryStr, posts_id, (err, results) => {
            cb(err, results);
          });
        });  
      });
    },
    mine: function(params, loggedInUserName, cb) {
      console.log('these are the params for a mine', params);
      var queryStr = 'select p.*, u.userHandle, u.userName, u.userLoc, u.userPhotoUrl, u.bio, u.email, u.followedCount, u.followed_id, u.followCount, u.follows_id  from posts as p inner join users as u on p.users_id=u.id where u.userHandle=(?) order by -createdAt';
      db.query(queryStr, Object.values(params), function(err, results1) {
        console.log(results1.length);
        if (results1.length < 1) {
          console.log('insidenotnot');
          cb('no posts');
        } else {
          const mineResults = results1;
          queryStr = `select f.users_id from followers as f inner join users as u on u.id = f.users_id where u.userHandle = ? and f.follows_id = ?`;
          console.log('mine', results1);
          console.log('mine 2nd params', [loggedInUserName, results1[0].users_id]);
          db.query(queryStr, [loggedInUserName, mineResults[0].users_id], (err, results2) => {
            console.log('second query for existing follow relationship', !!results2.length, results2);
            cb(err, mineResults, !!results2.length);
          })
        }
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
    info: function (user, cb) {
      console.log('user in info ', user);
      var queryStr = 'select * from users where userHandle=(?)';
      console.log(queryStr);
      db.query(queryStr, user, function(err, results) {
        cb(err, results);
      });
    },
    follow: function (follows_id, user, cb) {
      console.log(follows_id, 'this is the follows_id at the top of the follow function');
      var queryStr = 'select id from users where userHandle=(?)';
      db.query(queryStr, user, function(err, results) {
        if (err) {
          cb(err);
        }
        var params = [results[0].id, Object.keys(follows_id)[0]]
        queryStr = 'select * from followers where users_id=? and follows_id=?'
        console.log([results[0].id, Object.keys(follows_id)[0]], 'by this params?', params);
        db.query(queryStr, params, (err, results) => {
          if (err) {
            cb(err);
          }
          if (!results.length) {
          queryStr = 'insert into followers (users_id, follows_id) values (?,?)';
            console.log('is this params getting masked? ', params);
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
    updateprofile: function(params, newValue, cb) {
      var queryStr = ('update users set ' + newValue[0] + '=' + JSON.stringify(newValue[1]) + ` where userHandle=${JSON.stringify(params)}`);
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, results);
      })
    },
    updateusername: function(params, cb) {
      var queryStr1 = `update users set userHandle=${JSON.stringify(params.newName)} where userHandle = ${JSON.stringify(params.ghostuser)}`; 
      var queryStr2 = `update login set username=${JSON.stringify(params.newName)} where username=${JSON.stringify(params.ghostuser)}`;
      db.query(queryStr1, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, results);
      })
      db.query(queryStr2, (err, results) => {
        if (err) {
          console.log(err);
        }
        cb(err, results);
      })
      console.log('end of update')
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
    },
  },
  notifications: {
    addFollow: (params, cb) => {
      console.log('adding a follow notification. these are the params', params)
      var queryStr = 'select id from users where userHandle=?'
      db.query(queryStr, params.loggedInUser, (err, results) => {
        params.loggedInUser = results[0].id;
        console.log('results of first query', results[0].id)
        console.log(params, 'new params after first query call')
        var queryStr = 'insert into notifications (users_id, follows_id, note_time, noteType) values (?, ?, ?, 1)'
        db.query(queryStr, Object.values(params), (err, results) => {
          if (err) {
            console.log(err);
            cb(err)
          }
          console.log(results, 'the results of adding a follow notification')
          cb(null, results);
        })
      })
    },
    addFollowBack: (params, cb) => {
      console.log('adding a notification')
      var queryStr = ''
      db.query(queryStr, (err, results) => {
        if (err) {
          console.log(err);
          cb(err)
        }
        console.log(results, 'the results of adding a notification')
        cb(null, results);
      })
    },
    addComment: (params, cb) => {
      console.log(params, 'params starting out')
      var queryStr = 'select users_id from posts where id = ?'
      db.query(queryStr, params.postInfo.parent_id, (err, results) => {
        params.userComentedOn = results[0].users_id
        console.log('results of first query', results[0].users_id)
        console.log(params, 'new params after first query call')
        var queryStr = 'insert into notifications (users_id, posts_id, userLiked_id, note_time, follows_id, noteType) values (?, ?, ?, ?, 0, 0)'
        db.query(queryStr, [params.userComentedOn, params.postInfo.parent_id, params.loggedInUser, params.now], (err, results) => {
          if (err) {
            console.log(err);
            cb(err)
          }
          console.log(results, 'the results of adding a comment notification')
          cb(null, results);
        })
      })
    },
    addLike: (params, cb) => {
      console.log('adding a like notification. these are the params', params)
      var queryStr = 'select id from users where userHandle=?'      
      db.query(queryStr, params.loggedInUser, (err, results) => {
        params.loggedInUser = results[0].id;
        console.log('results of first query', results[0].id)
        console.log(params, 'new params after first query call')
        queryStr = 'select users_id from posts where id = ?'
        db.query(queryStr, params.postLiked, (err, results) => {
          params.userLiked_id = results[0].users_id
          console.log('results of second query', results[0])
          console.log(params, 'new params after second query call')
          var queryStr = 'insert into notifications (posts_id, userLiked_id, note_time, users_id, noteType) values (?, ?, ?, ?, 2)'
          db.query(queryStr, Object.values(params), (err, results) => {
            if (err) {
              console.log(err);
              cb(err)
            }
            console.log(results, 'the results of adding a comment notification')
            cb(null, results);
          })
        })
      })
    },
    get: (params, cb) => {
      var notifications = {};
      console.log('getting notifications') 
      var queryStr = 'select n.id, n.noteType, x.userHandle, n.posts_id, p.photoUrl, n.note_time, n.viewed from notifications as n join posts as p on n.posts_id = p.id join users as u on u.id = n.users_id join users as x on x.id = n.userLiked_id where (u.userHandle=? and p.photoUrl is not null and n.follows_id is not null)' //comment notifications
      db.query(queryStr, params, (err, results) => {
        console.log('these are comments notifications for the logged in user', results);
        notifications.comments = results //comments notifications
        queryStr = 
        `select n.id, n.noteType, x.userHandle, n.posts_id, p.photoUrl, n.note_time, n.viewed from notifications as n join users as u on u.id = n.users_id join users as x on x.id = n.userLiked_id join posts as p on n.posts_id = p.id where (u.userHandle=? and p.photoUrl is not null and n.noteType=2)` //like notification
        db.query(queryStr, params, (err, results) => {
          console.log('these are likes notifications for the logged in user', results);
          notifications.likes = results //likes notifications
          queryStr = 'select n.id, n.noteType, n.users_id, n.follows_id, x.userHandle, x.userPhotoUrl, n.note_time, n.viewed from notifications as n join users as u, users as x where u.id = n.users_id and n.follows_id = x.id and u.userHandle=?' //follow notification        
          db.query(queryStr, params, (err, results) => {
            console.log('these are follow notifications for the logged in user', results);
            notifications.follow = results //follow notifications
            if (err) {
              console.log(err);
              cb(err)
            }
            console.log(results, 'the results of getting a notification')
            cb(null, notifications);
          })
        })  
      })
    },
    view: (userHandle, cb) => {
      var queryStr = 'update notifications inner join users on notifications.users_id = users.id set viewed = 1 where userHandle=?'
      db.query(queryStr, userHandle, (err, results) => {
        if (err) {
          console.log(err)
        }
        cb(null, results);
      })
      console.log('marking notifications as viewed');
    },
    destroy: (params, cb) => {
      console.log('these are the params being sent to the destory function', params);
      var queryStr = 'delete from notifications where id=?'
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log(err)
        }
        cb(null, results);
      })
    }
  },
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
