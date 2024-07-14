const mongoose = require("mongoose");
const {Schema} = mongoose;

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user',
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
    });

module.exports  = mongoose.model("token",tokenSchema);