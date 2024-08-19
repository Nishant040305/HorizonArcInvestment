module.exports = (io, socket) => {
    socket.on('connectToServer', async (chatRoom) => {
        if(Array.isArray(chatRoom?.chatRoom)){
            chatRoom.chatRoom.forEach(async (room) => {
                console.log(`User ${socket.id} joining room: ${room}`);
                await socket.join(room);
                io.to(room).emit('connectToServer', `this is room ${room}`);
            });
        }
        if(chatRoom?.userId){
            console.log(`User ${socket.id} joining room: ${chatRoom.userId}`);
            socket.join(chatRoom.userId);
        }
    });
    socket.on('connectToAdmin',async()=>{
        socket.join('Admin');
    });
};
