const Models = require('./models');

const Controller = {
  Posts: {
    Create: (req, res) => {
      Models.posts.create(params, function(err, results) {
        var params = [req.body.userId, req.body.text, req.body.photo, req.body.location];
        models.messages.post(params, function(err, results) {
          if (err) { 
            console.log(err);
          } else {
          res.sendStatus(201);
          }
        });
      });
    Search: (req, res) => {
      Models.posts.find(params, function(err, results) {
        var params = [req.body.userId];
        models.messages.post(params, function(err, results) {
          if (err) { 
            console.log(err);
          } else {
          res.sendStatus(201);
          }
        });
      });
  },


  // module.exports = {

  //   messages: {
  //     get: function (req, res) {
  //       models.messages.get(function(err, results) {
  //         if (err) { /* do something */ }
  //         res.json(results);
  //       });
  //     },
  //     post: function (req, res) {
  //       var params = [req.body.message, req.body.username, req.body.roomname];
  //       models.messages.post(params, function(err, results) {
  //         if (err) { /* do something */ }
  //         res.sendStatus(201);
  //       });
  //     }
  //   },


  Search: (req, res) => {
    var name = req.body.username;
    Posts.find({})
      .then(data => {
        if (!data.length) {
          res.status(200).send('No matches found');
        } else {
          res.status(202).send(data);
        }
      })
  },

  Comment: (req, res) => {
    Posts.find({})
      .then(data => {
        if (!data.length) {
          res.status(200).send('No results');
        } else {
          res.status(202).send(data);
        }
      })
  },

  Signup: (req, res) => {
    var user = new Users({
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      bio: req.body.bio
    });
    user.save()
      .then(result => {
        res.status(201).send('Added');
      })
      .catch( err => {
        res.status(400).send('Error');
      })
  },

  Follow: (req, res) => {
    
    req.body.followId
  }
}

module.exports = Controller;