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
    Mandal:{
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
        type:[String],
    },
    Category:{
        type:String
    },
    Property:{
        type:String,
        default:"LeaseHold"
    }

});

const stock = mongoose.model("stock", StockSchema);
stock.createIndexes();
module.exports = stock;
