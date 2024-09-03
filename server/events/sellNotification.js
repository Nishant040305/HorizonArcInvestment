const Notification = require('../models/Notification');
module.exports = (io, socket) => {
    socket.on('Sell', async(requestData) => {
        const expiryDate = new Date(Date.now() + 24*7*60 * 60 * 1000); // Calculate expiry time

        const Notification_ =await  new Notification({
            NotifType:"Sell",
            message:requestData.message,
            SenderId:requestData.SenderId,
            expiry:expiryDate
        }).save();
        const roomName = 'Admin';
        io.to(roomName).emit('Sell',requestData);
    });
    socket.on('newShares',async(req)=>{
        const expiryDate = new Date(Date.now() + 24*3*60 * 60 * 1000); // Calculate expiry time

        const Notif = await new Notification({
            NotifType:"newShares",
            message:req,
            expiry:expiryDate
        }).save();
        io.emit('newShares',Notif);
    })
};
