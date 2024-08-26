const mongoose = require('mongoose');

const {Schema} = mongoose;

const FriendListSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        
    },
    Friends:{
        type:[Schema.Types.ObjectId],
        ref:'users',
        default:[]
    }
})


const friend = mongoose.model("friend", FriendListSchema);
friend.createIndexes();
module.exports = friend;
