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
            // unique:true
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
    }
)

const Land = mongoose.model('LandForSaleData',LandSchema);
Land.createIndexes();
module.exports = Land;
