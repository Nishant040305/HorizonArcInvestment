const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express = require("express");
const app = express();
const MongoDB = require("./models/mongodb");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const web = process.env.FRONTWEB;
const SPORT = process.env.SPORT;
const { cookie } = require("express-validator");
const router = express.Router();
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const User = require('./models/user');
const Notification = require('./models/Notification');
const ChatRoom = require('./models/ChatRoom');
const ChatRoomController = require('./controller/ChatRoomController');
const socketHandlers = require('./events');


const io = new Server({
    cors: {
        origin: web
    }
});
socketHandlers(io);
app.use(cors({
    origin:web,
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
//Available Routes

app.use('/',require('./routes/credential'));
app.use('/buyTab',require('./routes/LandForSale'));
app.use('/stockTab',require('./routes/StocksTab'));
app.use('/User',require('./routes/DashFriend'));
app.use('/notification',require('./routes/Notification'));
app.use('/chat',require('./routes/chat'));
app.use('/admin',require('./routes/Admin.routes'))
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server error');
  });
  
server.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
})

io.listen(SPORT);
io.httpServer.on('listening', function () {
    console.log('Chat server listening on PORT', io.httpServer.address().port);
});