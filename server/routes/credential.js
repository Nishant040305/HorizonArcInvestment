const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const credController = require("../controller/credControllers");




 //to pan verification 
router.post('/panVerification',[body('email').isEmail()],credController.PanVerification);
//For saving the Data into Database
router.post('/ConfirmDetail',[],credController.SaveData)
//testing panapi
router.post('/Pan',[body('email').isEmail()],credController.PanTesting);
router.get('/pantest',credController.Panexample);

//To get the User
router.post("/getInfo",credController.getInfo);
module.exports = router;