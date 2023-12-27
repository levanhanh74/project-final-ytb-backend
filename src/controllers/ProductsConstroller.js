const ProductService = require("../services/ProductsService");
const bcrypt = require('bcrypt');


const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating || !description) {
            console.log("Error 1 yeu cau nhap");
            return res.status(200).json({
                status: "Err",
                message: "The input is require enter!"
            })
        } else {
            // console.log("KQ UserControllers: ", name, image, type, price, countInStock, rating, description);
            const resTeu = await ProductService.createProductService(req.body);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const updateProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !rating || !description) {
            console.log("Error 1 yeu cau nhap");
            return res.status(200).json({
                status: "Err",
                message: "The input is require enter!"
            })
        } else {
            const idProduct = req.params.id;
            const resTeu = await ProductService.updateProductService(idProduct, req.body);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;

        if (!idProduct) {
            console.log("Error co params!");
            return res.status(200).json({
                status: "ERROR",
                message: "The requiment must params!"
            })
        } else {
            const idProduct = req.params.id;
            const resTeu = await ProductService.DeleteProductService(idProduct);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const detailProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;

        if (!idProduct) {
            console.log("Error co params!");
            return res.status(200).json({
                status: "ERROR",
                message: "The requiment must params!"
            })
        } else {
            const idProduct = req.params.id;
            const resTeu = await ProductService.DetailProductService(idProduct);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        // console.log(limit, ", ", page);

        const resTeu = await ProductService.GetAllProductService(Number(limit) || 3, Number(page) || 0, sort , filter);
        return res.status(200).json(resTeu);
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
module.exports = { createProduct, updateProduct, deleteProduct, detailProduct, getAllProduct };