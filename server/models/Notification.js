const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = Schema({
    receiverId:{
        type:[Schema.Types.ObjectId],
        ref:'user'
    },
    NotifType:{
        type:String,
        default:'notification',
    },
    message:{
        type:Object,
    },
    SenderId:{
        type:String,
        default:'application'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
 
    }
},
    
)

const notification = mongoose.model("notification", NotificationSchema);
notification.createIndexes();
module.exports = notification;
