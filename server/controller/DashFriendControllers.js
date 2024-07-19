const User = require('../models/user');

const getAllUser = async (req, res) => {
    try {
        const projection = { Username: 1, image: 1, _id: 1 }; // Specify the fields you want
        const data = await User.find({}, projection);
        res.status(200).json({ info: data });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getFriends = async(req,res)=>{
    const Id = req.query.userId;
    try {
        const data = await User.findById(Id);
        res.status(200).json({ info: data.friends });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllUser ,getFriends};
