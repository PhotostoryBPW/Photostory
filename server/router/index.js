const express = require('express');
const router = express.Router();
const Controller = require('../Controller');
const passport = require('passport');

router.get('/feed', Controller.posts.friends);
router.get('/feed/:username', Controller.posts.mine);
router.get('/search', Controller.posts.all);
router.get('/search/:username', Controller.users.find);
router.get('/profile/:username', Controller.users.info);
router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).send('destroyed');
})

router.post('/post', Controller.posts.create);
router.post('/comment', Controller.posts.comment);

router.post('/signup', (req, res) => {
    Controller.Signup(req, res);
});

router.post('/file-upload', (req, res) => {
    console.log('made it to file-upload route')
    Controller.file_upload(req, res);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500).send('error');
    } else if (info) {
      res.status(401).send('unauthorized');
    } else {
      req.login(user, (err) => {
        if (err) {
          res.redirect('/api/checksession');
        } else {
          res.redirect('/api/checksession');
        }
      })
    }
  })(req, res, next);
});

router.get('/checksession', (req, res) => {
  console.log(req.session);
  if (req.session.hasOwnProperty('passport')) {
    res.status(200).send('active');
  }
  else {
    res.status(200).send('inactive');
  }
});

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

module.exports = router;

