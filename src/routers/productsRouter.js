const express = require('express');

const routers = express.Router();
const ProductsController = require('../controllers/ProductsConstroller');
const { AuthMiddleWare, AuthMiddleWareUser } = require('../middleWare/authMiddleWare');

routers.post('/create', AuthMiddleWare, ProductsController.createProduct);
routers.put('/update/:id', AuthMiddleWare, ProductsController.updateProduct);
routers.get('/delete/:id', AuthMiddleWare, ProductsController.deleteProduct);
routers.get('/detailProduct/:id', AuthMiddleWareUser, ProductsController.detailProduct);
routers.get('/getallProduct', AuthMiddleWareUser, ProductsController.getAllProduct);



module.exports = routers; 