const express = require('express');
const router = express.Router();
const Controller = require('../Controller');
const passport = require('passport');

router.get('/feed', Controller.posts.all);
router.get('/feed/:username', Controller.posts.mine);
router.get('/likes', Controller.posts.likes);
router.get('/search', Controller.posts.all);
router.get('/search/:username', Controller.users.find);
router.get('/info', Controller.users.info);
router.get('/userprofileinfo', Controller.users.userprofileinfo);
router.get('/logout', function(req, res) {
    req.logout(); 
    req.session.destroy();
    res.status(200).send('destroyed');
});
router.get('/notifications', Controller.notifications);
router.put('/checkifnewusername', Controller.users.checkifnewusername);
router.put('/updateusername', Controller.users.updateusername);
router.put('/updatename', Controller.users.updatefullname);
router.put('/updateemail', Controller.users.updateemail);
router.put('/updatebio', Controller.users.updatebio);
router.put('/updateprofilepic', Controller.users.updateprofilepic);
router.post('/post', Controller.posts.create);
router.post('/comment', Controller.posts.comment);
router.post('/follow', Controller.users.follow);
router.post('/like', Controller.posts.like);
router.post('/unlike', Controller.posts.unlike);
router.post('/view', Controller.viewNotifications);
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
  if (req.session.hasOwnProperty('passport')) {
    res.status(200).send({'status': 'active', 'user': req.session.passport.user});
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

