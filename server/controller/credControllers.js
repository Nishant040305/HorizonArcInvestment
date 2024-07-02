const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const User = require("../models/user"); 
const {body,validationResult} = require("express-validator");
const bcrypt  = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwtToken = require('jsonwebtoken');
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
function panTestvar(panNumber){
    if(panNumber=="ALRPS4679R"){
        return {"status":200,"info":{
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
        }}
      }
      else{
        console.log("Wrong Pan")
        return json({"status":404,"errorMessage":"wrong PanNumber"})
        
      }
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
const  PanVerification = async(req,res)=>{
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


const SaveData =async (req,res)=>{
  console.log(req.body);
  let user = new User(req.body)
  await user.save();
  let _id = await User.findOne({pan:req.body.pan});
  res.status(200).json({"_id":_id});
};


//testing panapi
const PanTesting =async (req,res)=>{

    //if there are errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({"errorMessage":"Invalid Information"})
    }
    try{
      let user = await User.findOne({pan:req.body.pan});

      if(user){

        let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            return res.status(200).json({"data":req.body ,"otp":otp,"exist":1});
      }
      try{
        if(req.method=="POST"){
            const data =  Panexample(req,res);
        if(data.status==200){
          let otp = generateOtp();
            sendEmail(req.body.email,otp,req.body.Name);
            return res.status(200).json({"data":data.info,"otp":otp,"exist":0});
        }
        
          else{
            return res.status(data.status).json(data);
          }
        }
        
        }
        catch(errors){
          console.error(errors.message);
         return  res.status(500).send("internal server error")
        }}

    catch(errors){
      console.error(errors.message);
      return res.status(500).send("internal server error")
    }
   } 


const Panexample =async (req,res)=>{
    try{
        if(req.method=="GET"){
            let value = panTestvar(req.query.pan_number);
            if(value.status==200){
                return res.status(200).json({"info":value.info});
            }
            else{
                return res.status(value.status).json({"errorMessage":value.errorMessage});
            }
        }
        else if(req.method=="POST"){
            let value = panTestvar(req.body.pan);
            if(value.status==200){
               return  res.status(200).json({"info":value.info});
            }
            else{
                return res.status(value.status).json({"errorMessage":value.errorMessage});
            } 
        }
    }catch(Err){
        console.log(Err);
        return res.status(500).json({"errorMessage":"Internal server Error"})
    }
}

const getInfo =async(req,res)=>{
  console.log(req.body.pan)
  let user = await User.findOne({pan:req.body.pan});
  return res.status(200).json({"_id":user._id});
}
const createUser = async(req,res) =>{
  const jwtoken = jwtToken.sign({ pan:'ALRPS4679R',email: 'nishant040305@gmail.com', Name: 'Nishant Mohan',image:"https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no",dob:'2005-03-04',mobile:"9651602279"}, process.env.jwt_secreat);
  res.cookie('uid',jwtoken);
  console.log(req.cookies.uid);
  res.status(200).json({"jwtToke":req.cookies.uid});
}
module.exports = {Authenticate,PanTesting,Panexample,SaveData,PanVerification,getInfo,createUser};