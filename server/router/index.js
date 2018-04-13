const express = require('express');
const router = express.Router();
const Controller = require('../Controller');

router.get('/feed', Controller.posts.all);

router.post('/post', Controller.posts.create);

// router.get('/find', Controller.Users.Find);

// router.post('/signup', Controller.Users.Signup);

// router.post('/login', Controller.Users.Login);

module.exports = router;