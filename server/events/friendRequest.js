const Notification = require('../models/Notification');
const ChatRoomController = require('../controller/ChatRoomController');
const ChatRoom = require('../models/ChatRoom');
const FriendController = require('../controller/DashFriendControllers');
module.exports = (io, socket) => {
    socket.on('friend-request/send', async (requestData) => {

        const notification = await Notification.findOne({
            SenderId: requestData.SenderId,
            receiverId: [requestData.receiverId],
            NotifType: 'friend-request/send'
        });

        if (!notification) {
            const expiryDate = new Date(Date.now() + 24*7*60 * 60 * 1000); // Calculate expiry time
            const noti = await new Notification({
                SenderId: requestData.SenderId,
                receiverId: [requestData.receiverId],
                NotifType: 'friend-request/send',
                message: requestData.message,
                expiry:expiryDate
            }).save();

            io.to(requestData.receiverId).emit('friend-request/send', noti);
        }
    });

    socket.on('friend-request/accept', async (requestData) => {
        const { notification, userInfo } = requestData;
        await Notification.findByIdAndDelete(notification._id);
        const isFriend =await FriendController.AreFriends(notification.SenderId,userInfo.receiverId);
        if(!isFriend){
            const chatRoom = await new ChatRoom({
                users: [notification.SenderId, userInfo.receiverId],
            }).save();
            ChatRoomController.AddTwoUserToChat(notification.SenderId, userInfo.receiverId, chatRoom._id);
            FriendController.addFriends(notification.SenderId, userInfo.receiverId);
            await socket.join(chatRoom._id);
            io.to(chatRoom._id).emit('friend-request/accept',{chatRoom:chatRoom,friend:notification.SenderId});
            io.to(notification.SenderId.toString()).emit('friend-request/accept',{chatRoom:chatRoom,friend:userInfo.receiverId});
    
        }
    });

    socket.on('friend-request/reject', async (requestData) => {
        await Notification.findByIdAndDelete(requestData.notification);
    });
};
