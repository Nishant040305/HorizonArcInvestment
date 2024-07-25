module.exports = (io, socket) => {
    socket.on('message', (requestData) => {
        const roomName = requestData.chatRoom;
        io.to(roomName).emit(requestData);
    });
};
