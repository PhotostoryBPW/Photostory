const Models = require('./models');

const Controller = {
  Login: (req, res) => {
    console.log('hello from controller');
    console.log(Models, 'models models');
    Models.login(req, res, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.status(200).send(results);
      }
    })
  },
  Signup: (req, res) => {
    Models.signup(req, res, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(results);
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
    create: (req, res) => {
      console.log(req);
      Models.posts.create(req.body, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
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
      Models.users.find(params, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
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

//   Signup: (req, res) => {
//     var user = new Users({
//       userId: req.body.userId,
//       name: req.body.name,
//       email: req.body.email,
//       photo: req.body.photo,
//       bio: req.body.bio
//     });
//     user.save()
//       .then(result => {
//         res.status(201).send('Added');
//       })
//       .catch( err => {
//         res.status(400).send('Error');
//       })
//   }

//   Follow: (req, res) => {
//     req.body.followId
//   }
}
  

module.exports = Controller;