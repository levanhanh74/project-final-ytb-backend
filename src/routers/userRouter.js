const express = require('express');

const routers = express.Router();
const CreateUserController = require('../controllers/UserConstrollers');
const { AuthMiddleWare, AuthMiddleWareGetAllUser } = require('../middleWare/authMiddleWare');

routers.post('/signup', CreateUserController.CreateUserController);
routers.post('/login', CreateUserController.LoginUserController);
routers.put('/update/:id', CreateUserController.UpdateUserController);
routers.get('/delete/:id', AuthMiddleWare, CreateUserController.DeleteUserController);
routers.get('/getAllUser', AuthMiddleWare, CreateUserController.GetAllUserController);


module.exports = routers; 