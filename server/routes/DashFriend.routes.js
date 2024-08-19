const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();

const DashFriendController = require('../controller/DashFriendControllers');

router.get('/getAllUser',DashFriendController.getAllUser);
router.post('/getFriends',DashFriendController.getFriends);
router.post('/addFriend',DashFriendController.addFriendsAPI);
module.exports = router;