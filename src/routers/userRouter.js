const express = require('express');

const routers = express.Router();
const UserController = require('../controllers/UserConstrollers');

routers.post('/user', UserController);


module.exports = routers; 