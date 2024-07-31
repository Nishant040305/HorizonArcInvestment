const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const User = require("../models/user"); 
const Stock = require("../models/Stock");
const StockHold = require('../models/Stockhold');
const getInfo =async(req,res)=>{
    try{
        const Data = await Stock.find({});
        if(!Data) return res.status(404).json({message:"No Such Stocks"})
        res.status(200).json({"info":Data});

    }catch(e){
        console.log(e)
        res.status(500).json({message:"Internal Server Error"})
    }
}
const InsertStock = async(req,res)=>{
    try{
        const Data = await Stock.findOne({gataNumber:req.body.gataNumber});
        if(Data) return res.status(400).json({message:"A land All ready Exist"});
    
        const stock = new Stock(
            {
                gataNumber:req.body.gataNumber,
                Area:{amount:req.body.amount,unit:req.body.unit},
                Buyers:[],
                District:req.body.District,
                Mandal:req.body.Mandal,
                Village:req.body.Village,
                Category:req.body?.Category||"Residential/Plot",
                Images:req.body.Images,
                Price:req.body.Price,
                Stocks:req.body.Stocks,
                Description:req.body.Description,
                Highlights:req.body.Highlights,

            }
        ).save();
        res.status(200).json({message:"Entry Successfull"});
    }catch(e){
        console.log(e)
        res.status(500).json({message:" _ Internal Server Error"})
    }
}
const UpdatePrice = async(req,res)=>{
    try{
        const Data = await Stock.findById(req.body._id);
        if(!Data) return res.status(404).json({message:"No Such Data Exist"})
        const updateData = await Stock.findByIdAndUpdate(req.body._id, { $push: { Price: Number(req.body.Price) } });
        res.status(200).json({message:"Price Update Successfull"});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal Server Error"})
    }
}
const UpdateBuyer = async (req, res) => {
    try {
        const Data = await Stock.findById(req.body._id);
        const user = await User.findById(req.body.BuyerId);

        if (!Data || !user) {
            return res.status(404).json({ message: "No Such Data Exist" });
        }

        const existingStock = user.StocksHold.find((stock) => stock._id === req.body._id);
        if (existingStock) {
            existingStock.Stocks += req.body.Stocks;
        } else {
            user.StocksHold.push({
                _id: Data._id,
                Stocks: req.body.Stocks,
            });
        }

        await user.save();

        await Stock.findByIdAndUpdate(req.body._id, {
            $push: { Buyers: { _id: req.body.BuyerId, Stocks: Number(req.body.Stocks) } },
            $inc: { Stocks: -Number(req.body.Stocks) },
        });

        res.status(200).json({ message: "Buyer and Stocks Update Successful" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const  stockHoldgetInfo=async(req,res)=>{
    try{
        const data = await StockHold.findById(req.body._id);
        if(!data) return res.status(404).json({message:"ShortList Not found"});
        return res.status(200).json({info:data.land,infoLength:data.land.length});
    }catch(e){
        return res.status(500).json({message:"Internal server Error"})
    }
}
const stockHoldRemove = async (req, res) => {
    try {
        // Find the ShortList by ID
        const stockhold = await StockHold.findById(req.body.stockHold);
        if (!stockhold) {
            return res.status(404).json({ message: "No Such Shortlist" });
        }
        
        // Find the index of the item to remove
        const landIndex = StockHold.land.findIndex(item => item._id.toString() === req.body._id.toString());

        if (landIndex !== -1) {
            // Remove the item from the shortlist
            console.log(stockhold);
            
            await StockHold.findByIdAndUpdate(
                req.body.stockHold,
                { $pull: { land: stockhold.land[landIndex] } }
            );
            return res.status(200).json({ message: test });
        } else {
            return res.status(404).json({ message: "Item not found in shortlist" });
        }
    } catch (e) {
        console.error("Error removing item from shortlist:", e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const stockHoldAdd = async (req, res) => {
    try {
        console.log("Request received:", req.body);

        // Find the Land by ID
        const Data = await Stock.findById(req.body._id);
        if (!Data) {
            console.log("No such land found");
            return res.status(404).json({ message: "No Such Land" });
        }

        // Find the ShortList by ID
        const stockhold = await StockHold.findById(req.body.stockHold);
        if (!stockhold) {
            console.log("No such shortlist found");
            return res.status(404).json({ message: "No Such Shortlist" });
        }

        console.log("ShortList and Land data found:", stockhold, Data);

        // Check if the land is already in the shortlist
        const landIndex = stockhold.land.findIndex(item => item._id.toString() === Data._id.toString());

        if (landIndex === -1) {
            console.log("Land not in shortlist, adding now");

            // Update the ShortList with the new land
            await ShortList.findByIdAndUpdate(stockhold._id, { $push: { land: Data } });
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

module.exports = {stockHoldAdd,stockHoldRemove,getInfo,InsertStock,UpdatePrice,UpdateBuyer,stockHoldgetInfo};
