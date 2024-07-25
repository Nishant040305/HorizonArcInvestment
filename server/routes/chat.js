const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const chatControllers = require('../controller/ChatRoomController');
router.post('/chatAdd',chatControllers.AddToChatRoom);

module.exports = router;