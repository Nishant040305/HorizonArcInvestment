const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const express = require('express');
const router = express.Router();
const User = require("../../models/user"); 
const {body,validationResult} = require("express-validator");
const bcrypt  = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { request } = require('http');
let authToken = '';
async function Authenticate(){
  await fetch("https://production.deepvue.tech/v1/authorize",{
    method:"GET",
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    payload:{
      'client_id': process.env.clientID,
      'client_secret': process.env.clientSecreat

    }
  }).then(response=>{
    if(response.status===200){
      authToken=response.access_token;
    }
  })
}
function generateOtp() {
    // Generate a 6 digit random number
    let otp = crypto.randomInt(100000, 999999);
    return otp;
}

async function sendEmail(userEmail, otp,username) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });
    // Email options
    let mailOptions = {
        from: process.env.email,
        to: userEmail,
        subject: 'Password Change Request',
        text: ` 
        Dear ${userEmail},
        
        We received a request to reset the password for your account associated with this email address. If you made this request, this is your OTP.
        
        OTP to reset your password:
        ${otp}
        
        If you didn't request a password reset, please ignore this email or contact support if you have any questions.
        
        Your security is important to us. We recommend that you never share your password with anyone.
        
        Thank you,
        Shiksha
        `
    };
    // Send email
     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("failed"+otp)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

 //to pan verification 
router.post('/panVerification',[
  body('email').isEmail()
],async (req,res)=>{
    //if there are errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({"errorMessage":"Invalid Information"})
    }
    try{
      let user = await User.findOne({pan:req.body.pan});
      if(user){
        let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            return res.status(200).json({"data":response,"otp":otp});
      }
      try{
        const response = await fetch(`${process.env.PANBASIC}${req.body.pan}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${authToken}`,
            'x-api-key': process.env.clientSecreat
          }
        });
        const data = await response.json();
        if(response.status=200){
          let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            return res.status(200).json({"data":data,"otp":otp});
        }
          else if(response.status==403){
            Authenticate()
            const respond=async()=>{
            const res = await fetch(`${process.env.PANBASIC}${req.body.pan}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${authToken}`,
                'x-api-key': process.env.clientSecreat
              }
            });
            const datab = await res.json();
            
              if(response.status===200){
                let otp = generateOtp();
                sendEmail(req.body.email,otp,req.body.Name);
                res.status(200).json({"data":data,"otp":otp});
              }
              else{
                res.status(response.status).json(data);
              }
            }
          }
          else{
            res.status(response.status).json(data);
          }
        
      }catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error")
      }

    }catch(errors){
      console.error(errors.message);
      res.status(500).send("internal server error")
    }
   } 

);
router.post('/ConfirmDetail',[],async (req,res)=>{
  console.log(req.body);
  let user = new User(req.body)
  await user.save();
  let _id = await User.findOne({pan:req.body.pan});
  res.status(200).json({"_id":_id});
})


//testing panapi
router.post('/Pan',[
  body('email').isEmail()
],async (req,res)=>{

    //if there are errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.status(400).json({"errorMessage":"Invalid Information"})
    }
    try{
      let user = await User.findOne({pan:req.body.pan});

      if(user){
        console.log(req.body);

        let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            res.status(200).json({"data":req.body ,"otp":otp,"exist":1});
      }
      try{
            console.log(`${process.env.PANTEST}${req.body.pan}`);
        const response = await fetch(`${process.env.PANTEST}${req.body.pan}`,{
          method: 'GET',
          
        });
        const data = await response.json();
        if(response.status==200){
          let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            return res.status(200).json({"data":data.info,"otp":otp,"exist":0});
        }
        
          else{
            res.status(response.status).json(data);
          }
        }
        catch(errors){
          console.error(errors.message);
          res.status(500).send("internal server error")
        }}

    catch(errors){
      console.error(errors.message);
      res.status(500).send("internal server error")
    }
   } 

);
router.get('/pantest',async (req,res)=>{
  console.log("ok2")
  const panNumber = req.query.pan_number;
  try{
    if(panNumber=="ALRPS4679R"){
      return res.status(200).json({"info":{
        "code": 200,
        "timestamp": 1718660140474,
        "transaction_id": "3b2e9637ffc24d71b523540dea55d569",
        "sub_code": "SUCCESS",
        "message": "Pan Verified Successfully.",
        "data": {
          "pan_number": "ALRPS4679R",
          "full_name": "BRIJ MOHAN SRIVASTAVA",
          "full_name_split": [
            "BRIJ",
            "MOHAN",
            "SRIVASTAVA"
          ],
          "masked_aadhaar": "XXXXXXXX2279",
          "address": {
            "line_1": "lehra gohri ",
            "line_2": "",
            "street_name": "Lehra",
            "zip": "211013",
            "city": "ALLAHABAD",
            "state": "UTTAR PRADESH",
            "country": "INDIA",
            "full": "lehra gohri Lehra 211013 ALLAHABAD UTTAR PRADESH INDIA"
          },
          "email": "Brijmohan.srivastava@yahoo.com",
          "phone_number": "9670106492",
          "gender": "M",
          "dob": "1966-02-05",
          "aadhaar_linked": true,
          "category": "person"
        }
      }})
    }
    else{
      console.log("Wrong Pan")
      res.status(500).json({"errorMessage":"Wrong Pan"});
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({"errorMessage":"Internal server Error"})
  }
  
})

router.post("/getInfo",[],async(req,res)=>{
  console.log(req.body.pan)
  let user = await User.findOne({pan:req.body.pan});
  return res.status(200).json({"_id":user._id});
})
module.exports = router;