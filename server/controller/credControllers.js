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
const {generateOTP} = require('../utils/ImportantFunctions');
const Usergenerate = require('../utils/Username');
const shortList = require('../models/ShortList');
const Friend = require('../models/Friend');
const chatRoom = require('../models/UsersChatRoom');
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
      email:user.email,
      info:{
        message:"EmailVerification"
      }
		}).save();
		const url = `${process.env.FRONTWEB}/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		return res.status(200).json({ message: "An Email sent to your account please verify" });
  }
  else if(!user.verify){
    const tok = await Token.findOne({userId:user._id});
    if(tok&&tok.info.message=="EmailVerification"){
      
      const url = `${process.env.FRONTWEB}/users/${user._id}/verify/${tok.token}`;
		  await sendEmail(user.email, "Verify Email", url);
      return res.status(200).json({ message: "An Email sent to your account please verify" });

    }
    const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
      email:user.email,
      info:{
        message:"EmailVerification"
      }
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
		if (!token&&token.info.message!="EmailVerification") return res.status(400).json({ message: "Invalid link" });
    if(user.verify) return res.status(200).json({ info:user.Username, message: "Email verified successfully"  })
    const _short_Data = await new shortList({userId:user._id}).save();
    const _Friend_List = await new Friend({userId:user._id}).save();
    const _CHAT_ROOM_LIST = await new chatRoom({userId:user._id}).save();
    const userUpdate= await User.findOneAndUpdate({ _id: user._id},{ verify: true,Username:Usergenerate(token.email,user._id),chatRoomId:_CHAT_ROOM_LIST,shortList:_short_Data._id,friendId:_Friend_List._id },{new:true});
    delete userUpdate.password;
    const jwtData = jwtToken.sign(userUpdate,process.env.jwt_secreat)
		return res.status(200).json({info:userUpdate.Username, message: "Email verified successfully" });
	} catch (error) {
    console.log(error)
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
const LogIn = async(req,res)=>{
  try{
    let user = await User.findOne({Username:req.body.Username});
    if(!user){
      user = await User.findOne({email:req.body.Username});
      if(!user){
        return res.status(400).json({error:"please try to login with correct credentials"});
      }
    }
    const passwordCompare = await bcrypt.compare(req.body.password,user.password);
    if(!user.verify){
      return res.status(400).json({error:"please try to login with correct credentials"})

    }
    if(!passwordCompare){
      return res.status(400).json({error:"please try to login with correct credentials"})
    }
    delete user._doc.password;
    const jwtData = jwtToken.sign({...user._doc},process.env.jwt_secreat)
    res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
		res.status(200).json({info:{...user._doc}, message: "Login successful" });
  }catch(e){
    res.status(500).json({message:'Internal Server Error'});
  }
}
const EmailChange = async (req, res) => {
  try {
    const { _id, currentPassword, newEmail } = req.body;

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userTest = await User.findOne({
      email:newEmail})
    if(userTest){
      return res.status(400).json({message:"Email is Already in use"})
    }
    // Verify the current password
    const isMatch =  bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Create a new Token document for email change
    const token = new Token({
      userId: user._id,
      token: otp,
      email: newEmail,
      info: {
        message: "emailChange"
      }
    });

    await token.save();

    // Send OTP to the new email address
    const subject = "Your OTP for email change";
    const text = `Your OTP for email change is: ${otp}. Please use this OTP to confirm your new email address.`;
    sendEmail(newEmail, subject, text);

    return res.status(200).json({ message: "OTP sent to your new email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const EmailConfirmChange = async (req, res) => {
  try {
    const { _id, otp } = req.body;

    // Find the OTP token document
    const emailToken = await Token.findOne({
      token: otp,
      userId: _id,
      info:{
        message:"emailChange"
      } 
    });

    if (!emailToken) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Find the user by ID and update email
    const user = await User.findById(emailToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const subject = "Your Email Address Has Been Updated";

    const text = `
    Dear ${user.fullName},
    
    We wanted to let you know that your email address has been successfully updated to ${emailToken.email}. If you did not request this change, please contact our support team immediately.
    
    Thank you for using our services!
    
    Best regards,
    The Horizon Arc Investments Team
    `;
    sendEmail(user.email,subject,text);
    user.email = emailToken.email; // Update to new email address
    await user.save();
    delete user._doc.password;
    const jwtData = jwtToken.sign({...user._doc},process.env.jwt_secreat)
    res.cookie('uid',jwtData)
    
    // Remove the OTP token after successful email change
    await Token.deleteOne({
      token: otp,
      userId: _id,
      info:{
        message:"emailChange"
      } 
    });

    return res.status(200).json({ message: "Email updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const PasswordChange = async (req, res) => {
  try {
      let user=null;
      if(req.body._id!=null){
         user = await User.findById(req.body._id);
      }
      if (!user) {
           user = await User.findOne({email:req.body.email});
          if(!user){
            return res.status(404).json({ message: "User not found" });
          }
      }
      
      // Generate OTP
      const otp = generateOTP();

      const token = new Token({
          userId: user._id,
          token: otp, // Store OTP as token
          email: user.email,
          info: {
              message: "passwordChange"
          },
      });

      await token.save();

      // Send password change OTP
      const subject = "Your OTP for password change";
      const text = `Your OTP for password change is: ${otp}. Please use this OTP to change your password.`;
      sendEmail(user.email, subject, text);

      return res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

const PasswordChangeConfirm = async (req, res) => {
  try {
    const { _id, otp,email } = req.body;
    let emailToken = null;
    if(_id){
       emailToken = await Token.findOne({
        token: otp,
        userId: _id,
        info:{
          message:"passwordChange",
        } 
      });
    }
    else{
      emailToken = await Token.findOne({
        token: otp,
        email:email,
        info:{
          message:"passwordChange",
        } 
      });
    }
    if (!emailToken) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Generate a new token for confirmation
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const customExpiration = 600;
    const createdAt = customExpiration
    ? new Date(Date.now() - (300 - customExpiration) * 1000)
    : Date.now();
    const token = new Token({
      userId: emailToken.userId,
      token: confirmationToken,
      email: emailToken.email,
      info: { message: "passwordChangeConfirm" },
      createdAt:createdAt
    });

    await token.save();
    await Token.findByIdAndDelete(emailToken._id); // Delete the used OTP token

    return res.status(200).json({ token: confirmationToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const PasswordUpdate = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const confirmationToken = await Token.findOne({
      token: token,
      info:{message: "passwordChangeConfirm"}
    });
    if (!confirmationToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(confirmationToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encrypt the new password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();
    // await confirmationToken.delete(); // Delete the used confirmation token
    Token.findByIdAndDelete(confirmationToken._id)
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const BankDetailsChange = async (req, res) => {
  try {
    const { _id, password, BankName, AccountNumber, IFSC } = req.body;

    // Validate input
    if (!_id || !password || !BankName || !AccountNumber || !IFSC) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Update the bank details
    user.BankName = BankName;
    user.AccountNumber = AccountNumber;
    user.IFSC = IFSC;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Bank details updated successfully' });
  } catch (error) {
    console.error('Error updating bank details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const isValidUrl = (url) => {
  try {
      new URL(url);
      return true;
  } catch {
      return false;
  }
};
const ChangeProfile=async (req, res) => {
  try {
      const { _id, fullName, location, dob, image } = req.body;

      // Validate input
      if (!_id || !fullName || !location || !dob || !image) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      if (fullName.length < 3 || fullName.length > 30) {
          return res.status(400).json({ message: 'Full name must be between 3 and 30 characters' });
      }

      if (location.length > 50) {
          return res.status(400).json({ message: 'Location must be 50 characters or less' });
      }

      // Validate date format (example: YYYY-MM-DD)
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dobRegex.test(dob)) {
          return res.status(400).json({ message: 'Date of birth must be in YYYY-MM-DD format' });
      }

      if (!isValidUrl(image)) {
          return res.status(400).json({ message: 'Invalid image URL' });
      }

      // Find the user and update the profile
      const updatedUser = await User.findByIdAndUpdate(
          _id,
          { fullName, location, dob, image },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      delete updatedUser._doc.password;
      const jwtData = jwtToken.sign({...updatedUser._doc},process.env.jwt_secreat)
      res.cookie('uid',jwtData)
      res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {ChangeProfile,BankDetailsChange,EmailChange,EmailConfirmChange,PasswordChange, PasswordChangeConfirm, PasswordUpdate,Authenticate,PanTesting,Panexample,SaveData,PanVerification,getInfo,createUser,VerifyUser,LogIn};