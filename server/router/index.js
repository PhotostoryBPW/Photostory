const express = require('express');
const router = express.Router();
const Controller = require('../Controller');

router.get('/feed', Controller.posts.all);

// router.post('/post', Controller.posts.create);

// router.get('/find', Controller.Users.Find);

router.post('/signup', (req, res) => {
    console.log('hello from router signup');
    Controller.Signup(req, res);
});

router.get('/login', Controller.Login);

module.exports = router;