const mongoose = require('mongoose')
const {Schema} = mongoose;

const ChatRoomSchema = new Schema({
    users:{
        type:[Schema.Types.ObjectId]
        
    },
    userUsername:{
        type:[String]
    },
    usersImage:{
        type:[String]
    },
    ChatIcon:{
        type:String,
        default:"NULL"
    }
})

const chatRoom = mongoose.model('chatRoom',ChatRoomSchema);

chatRoom.createIndexes();
module.exports = chatRoom;