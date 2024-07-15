const LandSchema = require('../models/LandForSale');

const getLandInfo = async(req,res)=>{

    const data = await LandSchema.find({});
    if(!data){
        return res.status(404).json({'errorMessage':"No Such Land Found"})
    }
    return res.status(200).json({"info":data});
}

const InsertBuyLand = async(req,res)=>{
    try{
        const Data = await LandSchema.findOne({gataNumber:req.body.gataNumber});
        if(Data) return res.status(400).json({message:"A land All ready Exist"});
    
        const stock = new LandSchema(
            {
                gataNumber:req.body.gataNumber,
                Area:{amount:req.body.amount,unit:req.body.unit},
                District:req.body.District,
                Mandal:req.body.Mandal,
                Village:req.body.Village,
                Category:req.body?.Category||"Residential/Plot",
                Images:req.body.Images,
                Price:req.body.Price,
                Description:req.body.Description,
                Highlights:req.body.Highlights,
                State:req.body.State

            }
        ).save();
        res.status(200).json({message:"Entry Successfull"});
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal Server Error"})
    }
}
const UpdatePrice = async(req,res)=>{
    try{
        const Data = await LandSchema.findById(req.body._id);
        if(!Data) return res.status(404).json({message:"No Such Data Exist"})
            const updateData = await LandSchema.findByIdAndUpdate(req.body._id, { $push: { Price: Number(req.body.Price) } });
        res.status(200).json({message:"Price Update Successfull"});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"})

    }
}
module.exports = {getLandInfo,InsertBuyLand,UpdatePrice};