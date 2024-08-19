const express  = require('express');
const router = express.Router();
const PaymentController = require('../controller/PaymentController');

router.post('/orders',PaymentController.generateOrder);
router.get('/payment/:paymentId',PaymentController.getPayment);
router.post('/paymentValidate',PaymentController.paymentValidation);




module.exports = router;