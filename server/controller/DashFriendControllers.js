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
            return 400;
        }
        if(user1.Friends.findIndex((item)=>item==userId1)!==-1||user2.Friends.findIndex((item)=>item==userId2)!==-1){
            return 400;
        }
        // Add ChatRoom to their chatRoom arrays
        user2.Friends.push(user_1._id);
        user1.Friends.push(user_2._id);

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
        else if(status==400){
            return res.status(400).json({message:"Bad Request"})
        }
        else{
            return res.status(500).json({message:"Internal Server Error"});

        }
    }catch(e){
        return res.status(500).json({message:e})
    }
}
const AreFriends =async(fid1,fid2)=>{
    const user1 = await User.findById(fid1);
    const user1_Friends = await Friends.findById(user1.friendId);
    if(user1_Friends.Friends.findIndex((item)=>item==fid2)!==-1){
            return 1;
    }else{
        return 0;
    }
}

module.exports = { AreFriends,getAllUser ,getFriends,addFriends,addFriendsAPI};
