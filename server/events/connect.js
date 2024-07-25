module.exports = (io, socket) => {
    socket.on('connectToServer', async (chatRoom) => {
        if (Array.isArray(chatRoom)) {
            chatRoom.forEach(async (room) => {
                console.log(`User ${socket.id} joining room: ${room}`);
                await socket.join(room);
                io.to(room).emit('connectToServer', `this is room ${room}`);
            });
        }
    });
};
