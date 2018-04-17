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
      console.log(req.body);
      Models.posts.create(req.body.params, function(err, results) {
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
    like: (req, res) => {
      Models.posts.like(req.params, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
    unlike: (req, res) => {
      Models.posts.unlike(req.params, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
      });
    },
    likes: (req, res) => {
      Models.posts.likes(req.session.passport.user, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    mine: (req, res) => {
      Models.posts.mine(req.params, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
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
        console.log('made it to find');
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
        }
      });
    },
    info: (req, res) => {
      Models.users.info(req.params, function(err, results) {
        if (err) { 
          console.log(err);
        } else {
          res.status(201).send(results);
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

//   Follow: (req, res) => {
//     req.body.followId
//   }
}
module.exports = Controller;