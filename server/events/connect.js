const chatsRoomDataId = require('../models/UsersChatRoom');

module.exports = (io, socket) => {
    socket.on('connectToServer', async (chatRoomId) => {
        
        const data = await chatsRoomDataId.findById(chatRoomId.chatRoom);
        if (!data) return;

        const chatRooms = data.ChatRooms;

        if (Array.isArray(chatRooms)) {
            chatRooms.forEach((room) => {
                console.log(`User ${chatRoomId.userId} joining room: ${room}`);
                socket.join(room.toString());
                io.to(room.toString()).emit('connectToServer', `This is room ${room}`);
            });
        }

        if (chatRoomId?.userId) {
            console.log(`User ${socket.id} joining room: ${chatRoomId.userId}`);
            socket.join(chatRoomId.userId);
        }
    });

    socket.on('connectToAdmin', () => {
        console.log(`User ${socket.id} joining room: Admin`);
        socket.join('Admin');
    });

    socket.on('connectToChatRoom', (chatRoomId) => {
        console.log(`User ${socket.id} joining room: ${chatRoomId}`);
        socket.join(chatRoomId.toString());
        io.to(chatRoomId.toString()).emit('connectToChatRoom', `This is room ${chatRoomId}`);
    });
};
