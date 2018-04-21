const Models = require('./models');

const Controller = {
  Signup: (req, res) => {
    Models.signup(req, res, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(results);
      }
    })
  },
  posts: {
    all: (req, res) => {
      Models.posts.all(function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    friends: (req, res) => {
      Models.posts.friends(function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    create: (req, res) => {
      Models.posts.create(req.body.params, req.session.passport.user, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
    comment: (req, res) => {
      Models.posts.comment(req.body.params, req.session.passport.user, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          console.log(req.body, 'wreck dat body on comment controller');
          Models.notifications.addComment({postInfo: req.body.params, loggedInUser: req.body.params.users_id, now: Date.now()}, (err, results) => {
            if (err) { 
              console.log(err);
            } else {
              console.log('added follow to database successfully', results);
            }
          });
          res.sendStatus(201);
        }
      });
    },
    delete: (req, res) => {
      Models.posts.delete(req.body, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
    like: (req, res) => {
      Models.posts.like(req.body, req.session.passport.user, function(err, results) {
        console.log('the req dot body on the like Controller', req.body)
        if (err) {
          console.log(err);
        } else {
          Models.notifications.addLike({postLiked: Object.keys(req.body)[0], loggedInUser: req.session.passport.user, now: Date.now()}, (err, results) => {
            if (err) { 
              console.log(err);
            } else {
              console.log('added follow to database successfully', results);
            }
          });
          res.status(201).send(results);
        }
      });
    },
    unlike: (req, res) => {
      Models.posts.unlike(req.body, req.session.passport.user, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    likes: (req, res) => {
      Models.posts.likes(req.params, req.session.passport.user, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    mine: (req, res) => {
      console.log(req.params, 'params on a mine functione form controller')
      Models.posts.mine(req.params, req.session.passport.user, function(err, results1, results2) {
        if (err) { 
          console.log(err);
          res.status(202).send('no posts to send');
        } else {
          //edge case where a user doesn't have posts - send follow data

          if (!results1) {
            results1 = results2
          } else {
          results1[0].isFollowing = results2;
          console.log('the results of the mine', results1);
          }
          res.status(201).send(results1);
        }
      });
    },
  },
  users: {
    create: (req, res) => {
      Models.users.create(params, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
    find: (req, res) => {
      Models.users.find(req.params, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    follow: (req, res) => {
      Models.users.follow(req.body, req.session.passport.user, function(err, results) {
        console.log('follow - controller', req.session.passport);
        if (err) { 
          console.log(err);
        } else {
          Models.notifications.addFollow({userFollowed: Object.keys(req.body)[0], loggedInUser: req.session.passport.user, now: Date.now()}, (err, results) => {
            if (err) { 
              console.log(err);
            } else {
              console.log('added follow to database successfully', results);
            }
          });
          res.status(201).send(results);
        }
      });
    },
    info: (req, res) => {
      var user = req.body.username || req.session.passport.user;
      Models.users.info(user, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    updatefullname: (req, res) => {
      Models.users.updatefullname(req.session.passport.user, req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      })
    },
    updateemail: (req, res) => {
      Models.users.updateemail(req.session.passport.user, req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      })
    },
    updatebio: (req, res) => {
      Models.users.updatebio(req.session.passport.user, req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      })
    },
    userprofileinfo: (req, res) => {
      Models.users.userprofileinfo(req.session.passport.user, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      })
    },
    updateprofilepic: (req, res) => {
      Models.users.updateprofilepic(req.session.passport.user, req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      })
    },
    updateusername: (req, res) => {
      Models.users.updateusername(req.body.ghostuser, req.body.replacementName.username, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      })
    },
    checkifnewusername: (req, res) => {
      Models.users.checkifnewusername(req.session.passport.user, req.body, (results) => {
        results.ghostuser = req.session.passport.user;
        var reversePayload = {
          results: results,
          ghostuser: req.session.passport.user
        }
        JSON.stringify(reversePayload);
        res.status(200).send(reversePayload);
      })
    }
  },
  
  file_upload: (req, res) => {
    console.log('made it to file_upload');
    console.log('this is the files: ', req.files);
  },

  notifications: (req, res) => {
    console.log('made it to notifications on Controller');
  }
//   Search: (req, res) => {
//     var name = req.body.username;
//     Posts.find({})
//       .then(data => {
//         if (!data.length) {
//           res.status(200).send('No matches found');
//         } else {
//           res.status(202).send(data);
//         }
//       })
//   }

//   Comment: (req, res) => {
//     Posts.find({})
//       .then(data => {
//         if (!data.length) {
//           res.status(200).send('No results');
//         } else {
//           res.status(202).send(data);
//         }
//       })
//   }

//   Follow: (req, res) => {
//     req.body.followId
//   }
};
module.exports = Controller;