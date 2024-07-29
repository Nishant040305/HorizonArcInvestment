const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const chatControllers = require('../controller/ChatRoomController');
router.post('/chatAdd',chatControllers.AddToChatRoom);
router.post('/getChat',chatControllers.getChats);
router.post('/getChatRoom',chatControllers.getRoomChat);
router.post('/addMessages',chatControllers.AddMessage);
router.delete('/deleteMessage',chatControllers.deleteMessage);
module.exports = router;