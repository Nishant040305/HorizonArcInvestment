const LandSchema = require('../models/LandForSale');
const User = require('../models/user');
const ShortList = require('../models/ShortList');
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
const addItemShortList = async (req, res) => {
    try {
        console.log("Request received:", req.body);

        // Find the Land by ID
        const Data = await LandSchema.findById(req.body._id);
        if (!Data) {
            console.log("No such land found");
            return res.status(404).json({ message: "No Such Land" });
        }

        // Find the ShortList by ID
        const shortList = await ShortList.findById(req.body.shortListID);
        if (!shortList) {
            console.log("No such shortlist found");
            return res.status(404).json({ message: "No Such Shortlist" });
        }

        console.log("ShortList and Land data found:", shortList, Data);

        // Check if the land is already in the shortlist
        const landIndex = shortList.land.findIndex(item => item._id.toString() === Data._id.toString());

        if (landIndex === -1) {
            console.log("Land not in shortlist, adding now");

            // Update the ShortList with the new land
            await ShortList.findByIdAndUpdate(shortList._id, { $push: { land: Data } });
            return res.status(200).json({ message: "Product Added" });
        } else {
            console.log("Land already in shortlist");
            return res.status(200).json({ message: "Product Already in Shortlist" });
        }
    } catch (e) {
        console.error("Internal Server Error:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const RemoveItemShortList = async (req, res) => {
    try {
        console.log(req.body);
        // Find the ShortList by ID
        const shortList = await ShortList.findById(req.body.shortListID);
        if (!shortList) {
            return res.status(404).json({ message: "No Such Shortlist" });
        }
        
        // Find the index of the item to remove
        const landIndex = shortList.land.findIndex(item => item._id.toString() === req.body._id.toString());

        if (landIndex !== -1) {
            // Remove the item from the shortlist
            console.log(shortList);
            
            await ShortList.findByIdAndUpdate(
                req.body.shortListID,
                { $pull: { land: shortList.land[landIndex] } }
            );
            const test = await ShortList.findById(req.body.shortListID);
            return res.status(200).json({ message: test });
        } else {
            return res.status(404).json({ message: "Item not found in shortlist" });
        }
    } catch (e) {
        console.error("Error removing item from shortlist:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getShortlistData =async(req,res)=>{
    try{
        const data = await ShortList.findById(req.body._id);
        
        if(!data) return res.status(404).json({message:"ShortList Not found"});
        return res.status(200).json({info:data.land,infoLength:data.land.length});
    }catch(e){
        return res.status(500).json({message:"Internal server Error"})
    }
}
const createShortList = async(req,res)=>{
    try{
        const shortlist =await new ShortList({
            userId:req.body._id,
        }).save();
        const user = await User.findByIdAndUpdate(req.body._id,{shortList:shortlist._id});
        return res.status(200).json({message:"successfull"});
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = {createShortList,getLandInfo,InsertBuyLand,getShortlistData,UpdatePrice,RemoveItemShortList,addItemShortList};