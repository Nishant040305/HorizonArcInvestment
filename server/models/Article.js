const mongoose = require('mongoose');

const {Schema} = mongoose;

const Article = Schema({
    title:{
        type:String,
    },
    image:{
        type:String,
    },
    link:{
        type:String,
    }
})


const Article_ = mongoose.model("Article", Article);
Article_.createIndexes();
module.exports = Article_;
