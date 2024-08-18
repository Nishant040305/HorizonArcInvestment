const { HttpsProxyAgent } = require('https-proxy-agent');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const LandSchema = require('../models/LandForSale')
const Stock = require('../models/Stock')
const Notification = require('../models/Notification');
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYKEY,
    api_secret: process.env.CLOUDNIARYSECREAT,
});

// Configure proxy for HTTP/HTTPS requests
const proxyUrl = 'http://edcguest:edcguest@172.31.102.29:3128';
// const agent = new HttpsProxyAgent(proxyUrl);

const ImageUpload = (req, res) => {
    const file = req.file;

    if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a Cloudinary upload stream
    const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image',
            folder: 'HorizonArcInvestment', 
             },
        (error, result) => {
            if (error) {
                console.error('Failed to upload image:', error);
                return res.status(500).json({ error: 'Failed to upload image' });
            }

            console.log('Image uploaded successfully:', result.secure_url);

            // Return a JSON response with the image URL
            res.json({ url: result.secure_url });
        }
    );

    // Stream the file buffer to the Cloudinary upload stream
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
};

const InsertBuyLand = async (req, res) => {
    try {
        console.log("Incoming data:", req.body);
        let data = req.body.updatedLand;

        // Validate gataNumber
        if (!data.gataNumber) {
            return res.status(400).json({ message: "Gata Number is required" });
        }

        // Check if a land with the same gataNumber already exists
        const existingLand = await LandSchema.findOne({ gataNumber: data.gataNumber });
        if (existingLand) {
            return res.status(400).json({ message: "A land with this Gata Number already exists" });
        }

        // Construct the data for insertion
        let Images=[]
        let i =0;
        for(let key in data.Images){
            Images[i] = data.Images[key];
            key++;
        }


        // Save the new land document
        const newLand = new LandSchema({
            gataNumber: data.gataNumber,
            Area: { amount: Number(data.Area.amount), unit: data.Area.unit },
            District: data.District,
            Division: data.Division,
            Village: data.Village,
            Category: data?.Category || "Residential/Plot",
            Images: data.Images,
            Price: [Number(data.Price)],
            Description: data.Description,
            Highlights: data.Highlights,
            State: data.State,
            location: data.location,
        });
        console.log(newLand);
        await newLand.save();
       return res.status(200).json({ message: "Entry Successful" });
    } catch (e) {
        console.log(e);
       return res.status(500).json({ message: "Internal Server Error" });
    }
};
const InsertStock = async (req, res) => {
    try {
        console.log("Incoming data:", req.body);
        let data = req.body.updatedLand;

        // Validate gataNumber
        if (!data.gataNumber) {
            return res.status(400).json({ message: "Gata Number is required" });
        }

        // Check if a land with the same gataNumber already exists
        const existingLand = await Stock.findOne({ gataNumber: data.gataNumber });
        if (existingLand) {
            return res.status(400).json({ message: "A land with this Gata Number already exists" });
        }

        // Construct the data for insertion
        let Images=[]
        let i =0;
        for(let key in data.Images){
            Images[i] = data.Images[key];
            i++;
        }
        data.Shares = Number(data.Shares);
        console.log("Stocks:->",data.Shares)
        // Save the new land document
        const newLand = new Stock({
            gataNumber: data.gataNumber,
            Area: { amount: Number(data.Area.amount), unit: data.Area.unit },
            District: data.District,
            Division: data.Division,
            Village: data.Village,
            Category: data.Category,
            Images: Images,
            Price: [Number(data.Price)],
            Description: data.Description,
            Highlights: data.Highlights,
            State: data.State,
            location: data.location,
            Stocks:data.Share,
        });
        console.log(newLand);
        await newLand.save();
       return res.status(200).json({ message: "Entry Successful" });
    } catch (e) {
        console.log(e);
       return res.status(500).json({ message: "Internal Server Error" });
    }
};
const NotificationGet = async (req, res) => {
    try {
        console.log("walla");
        const data = await Notification.find({ NotifType: "Sell" });
        return res.status(200).json({ info: data });
    } catch (E) {
        console.log(E);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const UpdateLand = async (req, res) => {
    try {
        const { updatedFormData, type } = req.body;

        if (!updatedFormData || !type) {
            return res.status(400).json({ message: 'Missing updatedFormData or type' });
        }

        const { _id, location, Area, gataNumber, State, District, Village, Images, Price, Description, Highlights, Category, Property, Division } = updatedFormData;

        if (!_id) {
            return res.status(400).json({ message: 'Missing ID in updatedFormData' });
        }

        // Construct the update object with only the necessary fields
        const updateData = {
            location,
            Area,
            gataNumber,
            State,
            District,
            Village,
            Images,
            Price,
            Description,
            Highlights,
            Category,
            Property,
            Division
        };

        let updatedDocument;
        
        if (type === 'land') {
            updatedDocument = await LandSchema.findByIdAndUpdate(_id, updateData, { new: true });
        } else if (type === 'stock') {
            updatedDocument = await Stock.findByIdAndUpdate(_id, {...updateData,stock:updatedFormData.stock}, { new: true });
        } else {
            return res.status(400).json({ message: 'Invalid type specified' });
        }

        if (!updatedDocument) {
            return res.status(404).json({ message: `${type} data not found` });
        }
        console.log(updatedDocument);
        return res.status(200).json(updatedDocument);
    } catch (error) {
        console.error('Error updating data', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
};



const getLandInfo = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check in LandSchema
        let landData = await LandSchema.findById(id);
        
        // Check in StockSchema if not found in LandSchema
        if (!landData) {
            landData = await LandSchema.findOne({gataNumber:id});
            if(!landData){
                landData = await Stock.findById(id);
                if(!landData){
                    landData = await Stock.findOne({gataNumber:id});
                }
            }
        }
        
        if (!landData) {
            return res.status(404).json({ message: 'Land data not found' });
        }
        
        // Determine the type of data
        const dataType = landData instanceof LandSchema ? 'land' : 'stock';
        
        res.status(200).json({ data: landData, type: dataType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
;

const DeleteLand = async (req, res) => {
    try {
        const { id, type } = req.params;
        
        if (type === 'land') {
            const result = await LandSchema.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ message: 'Land data not found' });
            }

            res.status(200).json({ message: 'Land data deleted successfully' });
        } else if (type === 'stock') {
            const result = await Stock.findByIdAndDelete(id);

            if (!result) {
                return res.status(404).json({ message: 'Stock data not found' });
            }

            res.status(200).json({ message: 'Stock data deleted successfully' });
        } else {
            res.status(400).json({ message: 'Invalid type specified' });
        }
    } catch (error) {
        console.error('Error deleting data', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {DeleteLand, ImageUpload,InsertBuyLand,InsertStock,NotificationGet,UpdateLand,getLandInfo};
