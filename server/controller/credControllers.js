const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const User = require("../models/user"); 
const {body,validationResult} = require("express-validator");
const bcrypt  = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwtToken = require('jsonwebtoken');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const Usergenerate = require('../utils/Username');
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
  let user = await User.findOne({pan:req.body.pan});
  return res.status(200).json({"_id":user._id});
}

//User Authentication
const createUser = async(req,res) =>{
  let user = await User.findOne({email:req.body.email});
  if(!user){
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body,password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
      email:user.email
		}).save();
		const url = `${process.env.FRONTWEB}/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		return res.status(200).json({ message: "An Email sent to your account please verify" });
  }
  else if(!user.verify){
    const tok = await Token.findOne({userId:user._id});
    if(tok){
      const url = `${process.env.FRONTWEB}/users/${user._id}/verify/${tok.token}`;
		  await sendEmail(user.email, "Verify Email", url);
      return res.status(200).json({ message: "An Email sent to your account please verify" });

    }
    const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
      email:user.email
		}).save();
		const url = `${process.env.FRONTWEB}/users/${user._id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		return res.status(200).json({ message: "An Email sent to your account please verify" });
  }
  return res.status(400).json({message:"User All ready Exist"})

}
const VerifyUser = async(req,res)=>{


  try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).json({ message: "Invalid link" });
    
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).json({ message: "Invalid link" });
    const userUpdate= await User.findOneAndUpdate({ _id: user._id},{ verify: true,Username:Usergenerate(token.email,user._id),chatRoom:[user._id] },{new:true});
    const jwtData = jwtToken.sign({...userUpdate,password:"XXXXXX"},process.env.jwt_secreat)
    res.cookie('uid',jwtData)
		res.status(200).json({info:userUpdate.Username, message: "Email verified successfully" });
	} catch (error) {
    console.log(error)
		res.status(500).json({ message: "Internal Server Error" });
	}
}
const LogIn = async(req,res)=>{
  try{
    let user = await User.findOne({Username:req.body.Username});
    if(!user){
      return res.status(400).json({error:"please try to login with correct credentials"})
    }
    const passwordCompare = bcrypt.compare(req.body.password,user.password);
    if(!passwordCompare||!user.verify){
      return res.status(400).json({error:"please try to login with correct credentials"})
    }
    const jwtData = jwtToken.sign({...user._doc,password:"XXXXXX"},process.env.jwt_secreat)
    res.cookie('uid',jwtData)
		res.status(200).json({info:{...user._doc,password:"XXXXXX"}, message: "Login successful" });
  }catch(e){
    res.status(500).json('Internal Server Error');
  }
}

module.exports = {Authenticate,PanTesting,Panexample,SaveData,PanVerification,getInfo,createUser,VerifyUser,LogIn};