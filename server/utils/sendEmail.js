const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

async function sendEmail(userEmail,subject,text) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    // Email options
    let mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject,
        text: text
    };
    // Send email
     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("failed",error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendEmail;