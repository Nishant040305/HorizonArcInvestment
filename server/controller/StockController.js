const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const User = require("../models/user"); 
const Stock = require("../models/Stock");
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

module.exports = {getInfo,InsertStock,UpdatePrice,UpdateBuyer};
