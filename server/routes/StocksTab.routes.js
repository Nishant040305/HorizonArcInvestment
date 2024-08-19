const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const StockController = require('../controller/StockController');

router.get('/',StockController.getInfo);
router.post('/InsertStocksData',StockController.InsertStock)
router.post('/UpdateBuyers',StockController.UpdateBuyer);
router.post('/PriceUpdate',StockController.UpdatePrice);
router.post('/stockHoldAdd',StockController.stockHoldAdd);
router.post('/stockHoldRemove',StockController.stockHoldRemove);
router.post('/stockHoldgetInfo',StockController.stockHoldgetInfo);
module.exports = router;