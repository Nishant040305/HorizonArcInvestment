const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const credController = require("../controller/credControllers");
const credMiddleware = require('../middleware/credMiddleware');

router.get('/',credMiddleware.UserVerifier,async(req,res)=>{
  console.log("doesnt works");
  res.status(200).json({"errorMessage":"testing"});
})

//panVerification
router.post('/panVerification',[
  body('email').isEmail()
],credController.PanVerification);

//For saving the Data into Database
router.post('/ConfirmDetail',[],credController.SaveData)

//testing panapi
router.post('/Pan',[
  body('email').isEmail()
],credController.PanTesting
);

router.get('/pantest',credController.Panexample);

router.post("/getInfo",[],credController.getInfo);
router.get('/jsonwebtoken',credController.createUser);
module.exports = router;