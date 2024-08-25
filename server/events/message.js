const Message = require('../models/messages');

module.exports = (io, socket) => {
    socket.on('message', async (requestData) => {
        const message = await new Message({
            ChatRoomId: requestData.ChatRoomId,
            message: requestData.message,
            SenderId: requestData.SenderId,
            isSeen: [requestData.SenderId]
        }).save();

        const roomName = requestData.ChatRoomId;
        io.to(roomName.toString()).emit('message', message);
    });

    socket.on('markAsSeen', async ({ chatRoomId, userId }) => {
        // Step 1: Find the messages that will be updated
        const messagesToUpdate = await Message.find({
            ChatRoomId: chatRoomId,
            isSeen: { $ne: userId }
        }, { _id: 1 }); // Fetch only the _id of messages to be updated
    
        // Extract the IDs of these messages
        const messageIds = messagesToUpdate.map(message => message._id);
    
        // Step 2: Update the isSeen field for relevant messages
        await Message.updateMany(
            { _id: { $in: messageIds } },
            { $addToSet: { isSeen: userId } }
        );
    
        // Step 3: Retrieve only the updated message information
        const updatedMessages = await Message.find(
            { _id: { $in: messageIds } },
            { _id: 1, ChatRoomId: 1, isSeen: 1 } // Project only necessary fields
        );
    
        // Step 4: Emit only the updated messages
        io.to(chatRoomId.toString()).emit('messageSeenUpdate', updatedMessages);
    });
    socket.on('message-delete',async(data)=>{
        io.to(data.ChatRoomId.toString()).emit('message-delete',data);
    })
    socket.on('Delete-All-Chat',async(data)=>{
        io.to(data.toString()).emit('Delete-All-Chat',data.toString())
    })
    };
