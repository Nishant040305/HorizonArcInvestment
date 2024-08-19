const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const crypto = require('crypto')
const Razorpay = require('razorpay')
const generateOrder = async(req,res)=>{
    const razorpay = new Razorpay({
        key_id:process.env.PAYMENTAPI,
        key_secret:process.env.PAYMENTSCREAT
    })
    const options = {
        amount:req.body.amount,
        currency:req.body.currency,
        receipt:req.body.receipt,
        payment_capture:1
    }
    try{
    
        const response = await razorpay.create(options);
        res.status(200).json({
            order_id:response.id,
            currency:response.currency,
            amount:response.amount
        })
        // res.status(200).json({
        //     order_id:"order_9A33XWu170gUtm",
        //     currency:req.body.currency,
        //     amount:req.body.amount
        // })
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}


const getPayment = async(req,res)=>{

    const {paymentId} = req.params;
    const razorpay = new Razorpay({
        key_id:process.env.PAYMENTAPI,
        key_secret:process.env.PAYMENTSCREAT
    })
    try{
        const payment = await razorpay.payments.fetch(paymentId);
        if(!payment){
            return res.status(500).json("Error at razorpay loading");
        }
        res.status(200).json({
            status:payment.status,
            method:payment.method,
            amount:payment.amount,
            currency:payment.currency
        })
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}
const paymentValidation = async(req,res)=>{
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_order_id  =req.body.razorpay_order_id;
    const razorpay_signature = req.body.razorpay_signature;

    const sha = crypto.createHmac("sha256",process.env.PAYMENTSCREAT);
    const digest = sha.digest("hex");
    if(digest!==razorpay_signature){
        return res.status(400).json({message:"Transaction is not legit"});

    }
    return res.status(200).json({
        msg:"SUCCESS",
        orderId:razorpay_order_id,
        paymentId:razorpay_payment_id
    })
}
module.exports = {getPayment,generateOrder,paymentValidation};