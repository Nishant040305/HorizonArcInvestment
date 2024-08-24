const mongoose = require('mongoose');

const {Schema} = mongoose;

const ChatRoomsIDSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        
    },
    ChatRooms:{
        type:[Schema.Types.ObjectId],
        default:[]
    }
})


const chat = mongoose.model("chatRoomIDs", ChatRoomsIDSchema);
chat.createIndexes();
module.exports = chat;
