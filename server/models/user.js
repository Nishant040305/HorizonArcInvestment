const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema(
    {
        
        fullName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            
        },
        AccountNumber:{
            type:String
        },
        IFSC:{
            type:String
        },
        email:{
            type:String,
            require:true
        },
        verify:{
            type:Boolean,
            default:false
        },
        Username:{
            type:String,
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
