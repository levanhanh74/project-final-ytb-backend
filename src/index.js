const express = require('express');
const app = express();

//  Config env 
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;

// Config mongooseDb
const connectDB = require('./config/db/');
connectDB.connectDB();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Route all 
const routes = require('./routers/index'); 
routes(app);


// Port run 
app.listen(PORT, () => {
    console.log('Example your port is', PORT)
})