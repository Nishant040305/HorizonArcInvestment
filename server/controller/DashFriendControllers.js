const User = require('../models/user');
const Friends = require('../models/Friend');
const getAllUser = async (req, res) => {
    try {
        const projection = { Username: 1, image: 1, _id: 1 }; // Specify the fields you want
        const data = await User.find({verify:true}, projection);
        res.status(200).json({ info: data });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getFriends = async(req,res)=>{
    const Id = req.body._id;
    try {
        const data = await Friends.findById(Id);
        if(!data){
            return res.status(404).json({info:[],message:"User data not found"})
        }
        return res.status(200).json({ info: data.Friends });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const addFriends = async(userId1,userId2)=>{
    try {
        const user_1 = await User.findById(userId1)
        const user_2 = await User.findById(userId2) 
        const user1 = await Friends.findById(user_1.friendId);
        const user2 = await Friends.findById(user_2.friendId);

        if (!user1 || !user2) {
            console.log('User not found');
            return 400;
        }

        // Add ChatRoom to their chatRoom arrays
        user2.Friends.push({_id:user_1._id,Username:user_1.Username,image:user_1.image});
        user1.Friends.push({_id:user_2._id,Username:user_2.Username,image:user_2.image});

        // Save the updated users
        await user1.save();
        await user2.save();
        return 200;
    } catch (error) {
        console.error('Error adding ChatRoom:', error.message);
        return 500;
    }
}
const addFriendsAPI = async(req,res)=>{
    try{
        const status = await addFriends(req.body.user[0],req.body.user[1]);
        if(status === 200){
            return res.status(200).json({message:"Users are Friend"});
        }
        else if(status === 404){
            return res.status(404).json({message:"User not found"});

        }
        else{
            return res.status(500).json({message:"Internal Server Error"});

        }
    }catch(e){
        return res.status(500).json({message:e})
    }
}
module.exports = { getAllUser ,getFriends,addFriends,addFriendsAPI};
