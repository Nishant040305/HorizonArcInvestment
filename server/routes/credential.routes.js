const path = require("path");
const express = require('express');
const {body,validationResult} = require("express-validator");
const router = express.Router();
const credController = require("../controller/credControllers");
const credMiddleware = require('../middleware/credMiddleware');

router.get('/',credMiddleware.UserVerifier,async(req,res)=>{
  return res.status(200).json({info:req.user})
})

router.post('/panVerification',[body('email').isEmail()],credController.PanVerification);
router.post('/ConfirmDetail',[],credController.SaveData)
router.post('/register',[body('email').isEmail()],credController.createUser)
router.post('/Pan',[body('email').isEmail()],credController.PanTesting);
router.get('/pantest',credController.Panexample);
router.post("/getInfo",[],credController.getInfo);
router.post('/register',[body('email').isEmail(),body('password').isLength(6),body('fullName').isLength(3)],credController.createUser);
router.post('/login',[body('password').isLength(6)],credController.LogIn)
router.get('/users/:id/verify/:token',credController.VerifyUser);
router.post('/passwordChange',credController.PasswordChange);
router.post('/passwordConfirm',credController.PasswordChangeConfirm);
module.exports = router;