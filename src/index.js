const express = require('express');
const app = express();
const cors = require('cors');
//  Config env 
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;

// Config mongooseDb
const connectDB = require('./config/db/');
connectDB.connectDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())

//Route all 
const routes = require('./routers/index');
routes(app);


// Port run 
app.listen(PORT, () => {
    console.log('Example your port is', PORT)
})