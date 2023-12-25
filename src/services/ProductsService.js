const Product = require("../models/Product");
const bcrypt = require('bcrypt');
const generalToken = require('./jwtService');

const createProductService = (newProduct) => {
    // console.log(newProduct);
    return new Promise(async (resolve, rejects) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct;
        try {
            const isCheckIdPr = await Product.findOne({ name }).exec();
            if (isCheckName !== null) {
                resolve({
                    status: "ERROR",
                    message: "This name already, please name difference!",
                    dataERROR: newProduct
                })
            } else {
                const newProduct = await Product.create({ name, image, type, price, countInStock, rating, description });
                if (newProduct) {
                    await resolve({
                        status: "OK",
                        message: "Create Product successfully",
                        data: newProduct,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}
const updateProductService = (idProduct, updateProduct) => {
    // console.log(newProduct);
    return new Promise(async (resolve, rejects) => {
        const { name, image, type, price, countInStock, rating, description } = updateProduct;
        try {
            const isCheckName = await Product.findOne({ name });
            console.log(isCheckName);
            if (isCheckName !== null) {
                console.log(isCheckName !== null);
                resolve({
                    status: "ERROR",
                    message: "This name already you need update name difference!",
                    dataERROR: updateProduct.name
                })
            } else {
                const updateProductCurrent = await Product.findByIdAndUpdate(idProduct, updateProduct, { new: true });
                console.log(" updateProductCurrunt: ", updateProduct);
                if (updateProductCurrent) {
                    await resolve({
                        status: "OK",
                        message: "Update Product successfully",
                        data: updateProductCurrent,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}
const DeleteProductService = (idProduct) => {
    // console.log(newProduct);
    return new Promise(async (resolve, rejects) => {
        try {
            const isCheckIdPr = await Product.findOne({ idProduct });
            console.log(isCheckIdPr);
            if (isCheckIdPr !== null) {
                console.log(isCheckIdPr !== null);
                resolve({
                    status: "ERROR",
                    message: "This Id not isset you need have id can delete product!",
                    dataERROR: idProduct
                })
            } else {
                const DeleteIdProduct = await Product.findByIdAndDelete(idProduct, { new: true });
                console.log("DeleteIdProduct: ", DeleteIdProduct);
                if (DeleteIdProduct) {
                    await resolve({
                        status: "OK",
                        message: "Delete Product successfully",
                        data: DeleteIdProduct,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}
const DetailProductService = (idProduct) => {
    // console.log(newProduct);
    return new Promise(async (resolve, rejects) => {
        try {
            const isCheckIdPr = await Product.findOne({ idProduct });
            // console.log(isCheckIdPr);
            if (isCheckIdPr !== null) {
                console.log(isCheckIdPr !== null);
                resolve({
                    status: "ERROR",
                    message: "This Id not isset you need have id can watch product!",
                    dataERROR: idProduct
                })
            } else {
                if (isCheckIdPr) {
                    await resolve({
                        status: "OK",
                        message: "Detail Product watched successfully",
                        data: isCheckIdPr,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}
const GetAllProductService = () => {
    // console.log(newProduct);
    return new Promise(async (resolve, rejects) => {
        try {
            const isIssetProduct = await Product.find({});
            // console.log(isIssetProduct);
            if (isIssetProduct !== null) {
                console.log(isIssetProduct !== null);
                resolve({
                    status: "SuccessFully",
                    message: "All process successfully, but not product!",
                    dataERROR: isIssetProduct
                })
            } else {
                if (isIssetProduct) {
                    await resolve({
                        status: "OK",
                        message: "List Product successfully",
                        data: isIssetProduct,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}


module.exports = { createProductService, updateProductService, DeleteProductService, DetailProductService, GetAllProductService };
