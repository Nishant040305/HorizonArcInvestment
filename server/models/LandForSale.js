const mongoose = require("mongoose");
const {Schema} = mongoose;
const LandSchema = new Schema(
    {
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
        gataNumber:{
            type:String,
            required:true,
            unique:true
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
    }
)

const Land = mongoose.model('LandForSaleData',LandSchema);
Land.createIndexes();
module.exports = Land;
