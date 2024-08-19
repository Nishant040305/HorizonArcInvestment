const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
async function sendEmail(userEmail,subject,text) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
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