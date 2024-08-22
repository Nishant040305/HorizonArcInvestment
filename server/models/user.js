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
        BankName:{
            type:String,
        },
        AccountNumber:{
            type:String
        },
        IFSC:{
            type:String
        },
        friendId:{
            type:Schema.Types.ObjectId,
            ref:'friends'
        },
        location:{
            type:String,
            default:"",
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
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
        shortList:{
            type:Schema.Types.ObjectId,
            ref:'shortList'
        },
        StocksHold:{
            type: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: "stock",
                    },
                    Stocks: {
                        type: Number,
                        default: 0, 
                    },
                },
            ],
        },
        chatRoom:{
            type:[String],
            default:[]
        }
    }
)

const user = mongoose.model('user',userSchema);
user.createIndexes();
module.exports = user;
