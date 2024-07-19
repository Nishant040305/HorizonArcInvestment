const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();

const DashFriendController = require('../controller/DashFriendControllers');

router.get('/getAllUser',DashFriendController.getAllUser);
router.get('/getFriends',DashFriendController.getFriends);
module.exports = router;