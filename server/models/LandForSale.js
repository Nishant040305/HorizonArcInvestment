const mongoose = require("mongoose");
const {Schema} = mongoose;
const LandSchema = new Schema(
    {
        Area:{
            type:String,
            required:true
        },
        GataNumber:{
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
            type:String,
        }
    }
)

const Land = mongoose.model('LandForSaleData',LandSchema);
Land.createIndexes();
module.exports = Land;
