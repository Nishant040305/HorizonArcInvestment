const Notification = require('../models/Notification');
const User = require('../models/user');
const getNotification =async(req,res)=>{
    try{
        const user = await User.findById(req.body.userId,{_id:1});
        if(!user) return res.status(404).json({message:'User Does not exist'});

        const notification = await Notification.find({
            receiverId:{$in: [req.body.userId] }
        },{senderId:1,message:1,NotifType:1,createdAt:1})
        return res.status(200).json({info:notification});
    }
    catch(e){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports = {getNotification};