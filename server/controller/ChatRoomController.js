const User = require('../models/user');
const AddTwoUserToChat = async(User1,User2,ChatRoom)=>{
    try {
        const user1 = await User.findById(User1);
        const user2 = await User.findById(User2);

        if (!user1 || !user2) {
            console.log('User not found');
            return;
        }

        // Add ChatRoom to their chatRoom arrays
        user1.chatRoom.push(ChatRoom);
        user2.chatRoom.push(ChatRoom);

        // Save the updated users
        await user1.save();
        await user2.save();

        // console.log('ChatRoom added successfully!');
    } catch (error) {
        console.error('Error adding ChatRoom:', error.message);
    }

}
const AddToChatRoom = async(req,res)=>{
    try{
        AddTwoUserToChat(req.body.user[0],req.body.user[1],req.body.chatRoom);
        res.status(200).json({message:"Added Successfully"})
    }
    catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = {AddTwoUserToChat,AddToChatRoom};