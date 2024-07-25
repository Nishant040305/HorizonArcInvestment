const User = require('../models/user');

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
    const Id = req.query.userId;
    try {
        const data = await User.findById(Id);
        res.status(200).json({ info: data.friends });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const addFriends = async(userId1,userId2)=>{
    try {
        const user1 = await User.findById(userId1);
        const user2 = await User.findById(userId2);

        if (!user1 || !user2) {
            console.log('User not found');
            return 400;
        }

        // Add ChatRoom to their chatRoom arrays
        user1.friends.push({_id:user1._id,Username:user1.Username,image:user1.image});
        user2.friends.push({_id:user2._id,Username:user2.Username,image:user2.image});

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
