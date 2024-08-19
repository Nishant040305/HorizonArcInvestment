const connectHandler = require('./connect');
const friendRequestHandler = require('./friendRequest');
const messageHandler = require('./message');
const SellReqHandler = require('./sellNotification');
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`user connected ${socket.id}`);
        connectHandler(io, socket);
        friendRequestHandler(io, socket);
        messageHandler(io, socket);
        SellReqHandler(io,socket);
    });
};