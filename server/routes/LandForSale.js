const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const LandForSaleController = require('../controller/LandForSaleControllers');

router.get('/',LandForSaleController.getLandInfo);
router.post('/InsertBuyLand',LandForSaleController.InsertBuyLand);
router.post('/UpdatePrice',LandForSaleController.UpdatePrice);

module.exports = router;