const express = require('express');
const router = express.Router();
const Controller = require('../Controller');

router.post('/post', Controller.New);

router.get('/search', Controller.Search);

router.post('/signup', Controller.Signup);

router.post('/login', Controller.Login);

module.exports = router;