const mongoose = require('mongoose');
const {Schema} = mongoose

const shortListSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        unique:true,
    },
    land:{
        type:[Schema.Types.ObjectId],
        ref:'LandForSaleData',
        default:[],
    }
})

const shortList = mongoose.model("shortList", shortListSchema);
shortList.createIndexes();
module.exports = shortList;
