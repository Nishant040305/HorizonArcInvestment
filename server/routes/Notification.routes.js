const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const NotificationControllers = require('../controller/NotificationControllers');
router.post('/',NotificationControllers.getNotification)

module.exports = router;