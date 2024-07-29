const Message = require('../models/messages');
module.exports = (io, socket) => {
    socket.on('message', async(requestData) => {
        const roomName = requestData.ChatRoomId;
        console.log(roomName,requestData);
        io.to(roomName).emit('message',requestData);
    });
};
