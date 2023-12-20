const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;


const connectDB = require('./config/db/');
connectDB.connectDB();

app.get("/", (req, res) => {
    res.send('Hanh Blue');
})

app.listen(PORT, () => {
    console.log('Example your port is', PORT)
})