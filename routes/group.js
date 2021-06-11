var express = require('express');
var router = express.Router();

const { groupsController } = require('../controller');

// * POST /groups/search
router.post('/search', groupsController.search.post);

// * GET /groups/search
router.get('/search', groupsController.search.get);

// * POST /groups/join
router.post('/join', groupsController.join.post);

// * GET /groups/list
router.get('/list', groupsController.list.get);

// * GET /groups/member
router.get('/member', groupsController.member.get);

module.exports = router;