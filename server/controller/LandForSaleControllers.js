const LandSchema = require('../models/LandForSale');

const getLandInfo = async(req,res)=>{

    const data = await LandSchema.find(req.qurey);
    if(!data){
        return res.status(404).json({'errorMessage':"No Such Land Found"})
    }
    return res.status(200).json({"info":data});
}

module.exports = {getLandInfo};