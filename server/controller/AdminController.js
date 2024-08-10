const { HttpsProxyAgent } = require('https-proxy-agent');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const LandSchema = require('../models/LandForSale')

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
module.exports = { ImageUpload,InsertBuyLand };
