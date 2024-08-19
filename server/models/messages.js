const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    ChatRoomId:{
        type:Schema.Types.ObjectId,
        ref:'chatRoom'
    },
    message:{
        type:String,
        default:''
    },
    SenderId:{
        type:Schema.Types.ObjectId,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}
)

const message = mongoose.model('message',messageSchema);
message.createIndexes();
module.exports = message;