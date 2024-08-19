const Message = require('../models/messages');
module.exports = (io, socket) => {
    socket.on('message', async(requestData) => {
        const message =await  new Message({
            ChatRoomId:requestData.ChatRoomId,
            message:requestData.message,
            SenderId:requestData.SenderId,
        }).save();
        const roomName = requestData.ChatRoomId;
        io.to(roomName).emit('message',requestData);
    });
};
