const express = require('express');
const router = express.Router();
const Article = require('../models/Article')
router.get('/',async(req,res)=>{
    try{
        const data = await Article.find({});
        return res.status(200).json({info:data});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({message:"Internal Server Error article"})
    }
    
})

module.exports = router;