const express = require('express');
const router = express.Router();
const Controller = require('../Controller');

router.get('/feed', Controller.posts.friends);
router.get('/search', Controller.posts.all);
router.get('/search/:username', Controller.users.find);

router.post('/post', Controller.posts.create);

// router.get('/find', Controller.Users.Find);

router.post('/signup', (req, res) => {
    Controller.Signup(req, res);
});

router.get('/login', Controller.Login);

module.exports = router;