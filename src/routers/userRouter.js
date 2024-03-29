const express = require('express');

const routers = express.Router();
const CreateUserController = require('../controllers/UserConstrollers');
const { AuthMiddleWare, AuthMiddleWareUser } = require('../middleWare/authMiddleWare');

routers.post('/signup', CreateUserController.CreateUserController);
routers.post('/login', CreateUserController.LoginUserController);
routers.post('/logout', CreateUserController.LogoutUserController);
routers.put('/update/:id', AuthMiddleWareUser, CreateUserController.UpdateUserController);
routers.get('/delete/:id', AuthMiddleWare, CreateUserController.DeleteUserController);
routers.get('/getAllUser', AuthMiddleWare, CreateUserController.GetAllUserController);
routers.get('/detailUser/:id', AuthMiddleWareUser, CreateUserController.DetailUserController);
routers.post('/refreshToken', CreateUserController.RefreshTokenController);
routers.post('/deleteMutiple/:id', AuthMiddleWare, CreateUserController.DeleteMutipleController);


module.exports = routers; 