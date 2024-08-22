const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
    gataNumber: {
        type: String,
        unique: true,
    },
    Area: {
       type: {
            amount:{
                type:Number,

            },
            unit:{
                type:String,
                default:"sq.m"
            },
        },
        
    },
    Buyers:
    {

    
    type: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
            Stocks: {
                type: Number,
                default: 0, 
            },
        },
    ],
    
    },
    State:{
        type:String,
        required:true,

    },
    District:{
        type:String,
        required:true,
    },
    Division:{
        type:String,
    },
    Village:{
        type:String,
        required:true
    },
    Images:{
        type:[String],
    },
    Price:{
        type:[Number],
    },
    Stocks:{
        type:Number,
        default:100
    },
    Description:{
        type:String,
    },
    Highlights:{
        type:[Object],
    },
    Category:{
        type:String
    },
    Property:{
        type:String,
        default:"LeaseHold"
    },
    location:{
        type:{
            latitude:{
                type:Number,
                default:25.5507,
            },
            longitude:{
                type:Number,
                default:81.8416
            }
        },
        default:{
            latitude:25.5507,
            longitude:81.8416
        }
    }

});

const stock = mongoose.model("stock", StockSchema);
stock.createIndexes();
module.exports = stock;
