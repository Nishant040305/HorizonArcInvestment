const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const LandForSaleController = require('../controller/LandForSaleControllers');

router.get('/',LandForSaleController.getLandInfo);

module.exports = router;