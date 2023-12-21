const express = require('express');

const routers = express.Router();
const CreateUserController = require('../controllers/UserConstrollers');

routers.post('/signup', CreateUserController.CreateUserController);
routers.post('/login', CreateUserController.LoginUserController);


module.exports = routers; 