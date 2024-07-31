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
            const noti = await new Notification({
                SenderId: requestData.SenderId,
                receiverId: [requestData.receiverId],
                NotifType: 'friend-request/send',
                message: requestData.message,
            }).save();

            io.to(requestData.receiverId).emit('friend-request/send', noti);
        }
    });

    socket.on('friend-request/accept', async (requestData) => {
        const { notification, userInfo } = requestData;
        await Notification.findByIdAndDelete(notification._id);
        const chatRoom = await new ChatRoom({
            users: [notification.SenderId, userInfo.receiverId],
            usersImage: [notification.message.image, userInfo.image],
            userUsername: [notification.message.Username, userInfo.Username]
        }).save();
        ChatRoomController.AddTwoUserToChat(notification.SenderId, userInfo.receiverId, chatRoom._id);
        FriendController.addFriends(notification.SenderId, userInfo.receiverId);
    });

    socket.on('friend-request/reject', async (requestData) => {
        await Notification.findByIdAndDelete(requestData.notification);
    });
};
