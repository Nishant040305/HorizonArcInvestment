const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express = require("express");
const app = express();
const MongoDB = require("./models/mongodb");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const web = process.env.FRONTWEB
const userdb = require("./models/user");
const { cookie } = require("express-validator");
const router = express.Router();
app.use(cors({
    origin:web,
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
//Available Routes

app.use('/',require('./routes/credential'));
app.use('/buyLand',require('./routes/LandForSale'));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server error');
  });
  
app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
})

