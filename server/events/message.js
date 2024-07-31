const Message = require('../models/messages');
module.exports = (io, socket) => {
    socket.on('message', async(requestData) => {
        const roomName = requestData.ChatRoomId;
        io.to(roomName).emit('message',requestData);
    });
};
