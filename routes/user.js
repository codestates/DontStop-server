var express = require('express');
var router = express.Router();

const { usersController } = require('../controller');

// * POST /users/login
router.post('/login', usersController.login.post);

// * GET /users/rank
router.get('/rank', usersController.rank.get);

// * POST /users/signup
router.post('/signup', usersController.signup.post);

// * POST /users/signout
router.post('/signout', usersController.signout.post);

// * POST /users/diary
router.post('/diary', usersController.diary.post);

// * POST /users/info
router.post('/info', usersController.info.post);

// * GET /users/info
router.get('/info', usersController.info.get);

module.exports = router;