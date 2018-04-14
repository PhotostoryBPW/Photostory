const express = require('express');
const router = express.Router();
const Controller = require('../Controller');
const passport = require('passport');

router.get('/feed', Controller.posts.friends);
router.get('/search', Controller.posts.all);
router.get('/search/:username', Controller.users.find);
router.post('/post', Controller.posts.create);

// router.get('/find', Controller.Users.Find);

router.post('/signup', (req, res) => {
    Controller.Signup(req, res);
});

router.post('/login', passport.authenticate(
    'local', {
        successRedirect: '/api/checksession',
        failureRedirect: '/api/checksession'
    }
));

router.get('/checksession', (req, res) => {
    console.log(req.session);
    if (req.session.hasOwnProperty('passport')) {
        res.status(200).send('active');
    }
    else {
        res.status(200).send('inactive');
    }
});

module.exports = router;

