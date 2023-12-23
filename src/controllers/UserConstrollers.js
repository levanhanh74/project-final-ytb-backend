const UserService = require("../services/UserServices");
const bcrypt = require('bcrypt');


const CreateUserController = async (req, res) => {
    try {
        // console.log("KQ", req.body);
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Dung bieu thuc chinh quy de test email.
        const isCheckEmail = reg.test(email);

        // console.log(isCheckEmail);
        if (!name || !email || !password || !confirmPassword || !phone) {
            console.log("Error 1");
            return res.status(200).json({
                status: "Err",
                message: "The input is require enter!"
            })
        } else if (!isCheckEmail) {
            console.log("Error 2");
            console.log("err mail");
            return res.status(200).json({
                status: "Err",
                message: "The input must is email ex@example!"
            })
        } else if (password !== confirmPassword) {
            console.log("Error 3");
            return res.status(200).json({
                status: "Err",
                message: "The input both password similar!"
            })
        } else {
            console.log("KQ UserControllers: ", name, email, password, confirmPassword, phone);
            const resTeu = await UserService.createUser(req.body);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const LoginUserController = async (req, res) => {
    try {
        // console.log("KQ", req.body);
        const { email, password, confirmPassword } = req.body;
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Dung bieu thuc chinh quy de test email.
        const isCheckEmail = reg.test(email);

        // console.log(isCheckEmail);
        if (!email || !password || !confirmPassword) {
            console.log("Error 1");
            return res.status(200).json({
                status: "Err",
                message: "The input is require enter!"
            })
        } else if (!isCheckEmail) {
            console.log("Error 2");
            console.log("err mail");
            return res.status(200).json({
                status: "Err",
                message: "The input must is email ex@example!"
            })
        } else if (password !== confirmPassword) {
            console.log("Error 3");
            return res.status(200).json({
                status: "Err",
                message: "The input both password similar!"
            });
        } else {
            // console.log("KQ UserControllers: ", email, password, confirmPassword );
            const resTeu = await UserService.loginUser(req.body);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const UpdateUserController = async (req, res) => {
    try {

        const userId = req.params.id;
        // console.log("IDUSER: ", userId);
        if (!userId) {
            return res.json({
                status: "ERROR",
                message: "You can't update this user, cause user not isset!"
            })
        } else {
            const resTeu = await UserService.UpdateUser(userId, req.body);
            return res.status(200).json(resTeu);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const DeleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        // console.log("IDUSER: ", userId);
        if (!userId) {
            return res.json({
                status: "ERROR",
                message: "You can't Delete this user, cause user not isset!"
            })
        } else {
            const resTeu = await UserService.DeleteUser(userId);
            return res.status(200).json({ data: resTeu });
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const GetAllUserController = async (req, res) => {
    try {
        const resTeu = await UserService.getAllUser();
        return res.status(200).json({ data: resTeu });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
module.exports = { CreateUserController, LoginUserController, UpdateUserController, DeleteUserController, GetAllUserController };