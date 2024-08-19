const Notification = require('../models/Notification');
module.exports = (io, socket) => {
    socket.on('Sell', async(requestData) => {

        const Notification_ =await  new Notification({
            NotifType:"Sell",
            message:requestData.message,
            SenderId:requestData.SenderId,
        }).save();
        const roomName = 'Admin';
        io.to(roomName).emit('Sell',requestData);
    });
};
