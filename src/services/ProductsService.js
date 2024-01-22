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
const GetAllProductService = (limit, page, sort, filter) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const countProduct = await Product.countDocuments();
            if (!sort && !filter) {
                const allProduct = await Product.find().limit(limit).skip(limit * page);
                resolve({
                    status: "OK",
                    message: "List All Product",
                    data: allProduct,
                    pageCurrent: (page + 1),
                    countProduct,
                    totalPage: Math.ceil(countProduct / limit)
                })
            } else {
                if (sort) {
                    // console.log(sort);
                    const allSortProduct = await Product.find().limit(limit).skip(limit * page).sort({ name: sort });

                    console.log(ObjectSort);
                    resolve({
                        status: "OK",
                        message: "List Product successfully sort",
                        data: allSortProduct,
                        pageCurrent: (page + 1),
                        countProduct,
                        totalPage: Math.ceil(countProduct / limit)
                    })
                }
                if (filter) {
                    console.log(filter);
                    const isFindProduct = await await Product.find({ name: { "$regex": filter } });
                    // console.log(isFindProduct);
                    if (!isFindProduct.length) {
                        resolve({
                            status: "OK",
                            message: "List Product haven't filter",
                            data: isFindProduct,
                            pageCurrent: (page + 1),
                            countProduct,
                            totalPage: Math.ceil(countProduct / limit)
                        })
                    } else {
                        resolve({
                            status: "OK",
                            message: "List Product filter",
                            data: isFindProduct,
                            pageCurrent: (page + 1),
                            countProduct,
                            totalPage: Math.ceil(countProduct / limit)
                        })
                    }
                }
            }

        } catch (error) {
            console.log("Loi o ProductsService!");
            rejects(error)
        }
    })
}


module.exports = { createProductService, updateProductService, DeleteProductService, DetailProductService, GetAllProductService };
