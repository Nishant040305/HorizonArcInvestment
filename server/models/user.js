const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema(
    {
        pan:{
            type:String,
            required:true
        },
        Name:{
            type:String,
            required:true
        },
        mobile:{
            type:Number,
            required:true
        },
        email:{
            type:String
        },
        dob:{
            type:String,
        },
        image:{
            type:String
        }
    }
)

const user = mongoose.model('user',userSchema);
user.createIndexes();
module.exports = user;
