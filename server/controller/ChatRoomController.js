const User = require('../models/user');
const Message = require('../models/messages');
const ChatRoom = require('../models/ChatRoom');
const UsersChatRoom = require('../models/UsersChatRoom');
const AddTwoUserToChat = async(User1,User2,ChatRoom)=>{
    try {
        const user1 = await User.findById(User1);
        const user2 = await User.findById(User2);

        if (!user1 || !user2) {
            console.log('User not found');
            return;
        }

        // Add ChatRoom to their user chatRoom arrays
        const user1ChatRoom = await UsersChatRoom.findByIdAndUpdate(user1.chatRoomId,{$push:{ChatRooms:ChatRoom}});
        const user2ChatRoom = await UsersChatRoom.findByIdAndUpdate(user2.chatRoomId,{$push:{ChatRooms:ChatRoom}});

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
const getChats = async(req,res)=>{
    try{
        const data = {};
        let chatData = [];
        const chatRoomId = req.body.chatRoom;
        const chatRoomData = await UsersChatRoom.findById(chatRoomId);
        if(!chatRoomData) return res.status(400).json({message:"No such user exist"});
        const chatRoom = chatRoomData.ChatRooms;
        for(let i = 0;i<chatRoom.length;i++){
            data[chatRoom[i]] = await Message.find({ChatRoomId:chatRoom[i]});
            chatData[i] =await ChatRoom.findById(chatRoom[i]);
        }
        return res.status(200).json({info:{message:data,chatRoom:chatData}});

    }
    catch(e){
        return res.status(500).json({message:'Internal Server Error'});
    }
}
const getRoomChat = async(req,res)=>{
    try{
        const data = await Message.find({ChatRoomId:req.body.chatRoomId});
        return res.status(200).json({info:data});
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const AddMessage = async(req,res)=>{
    try{
        await new Message({
            ChatRoomId:req.body.payload.ChatRoomId,
            message:req.body.payload.message,
            SenderId:req.body.payload.SenderId
        }).save();
        return res.status(200).json({message:"Message Send"})

    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const deleteMessage = async(req,res)=>{
    try{
        await Message.findByIdAndDelete(req.body._id);
        return res.status(200).json({messge:"Message Deleted"})

    }catch(e){
        return res.status(500).json({message:'Internal Server Error'})
    }
}
module.exports = {deleteMessage,AddTwoUserToChat,AddToChatRoom,getChats,getRoomChat,AddMessage};