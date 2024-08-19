const mongoose = require('mongoose');

const {Schema} = mongoose;

const FriendListSchema = Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        
    },
    Friends:{
        type:[Object],
        default:[]
    }
})


const friend = mongoose.model("friend", FriendListSchema);
friend.createIndexes();
module.exports = friend;
