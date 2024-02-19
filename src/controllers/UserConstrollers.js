const UserService = require("../services/UserServices");
const bcrypt = require('bcrypt');
const jwtService = require("../services/jwtService");

const CreateUserController = async (req, res) => {
    try {
        // console.log("KQ", req.body);
        const { password, email } = req.body;
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Dung bieu thuc chinh quy de test email.
        const isCheckEmail = reg.test(email);

        // console.log(isCheckEmail);
        if (!email || !password) {
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
        } else {
            // console.log("KQ UserControllers: ", email, password, confirmPassword);
            const response = await UserService.createUser(req.body);
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const LoginUserController = async (req, res) => {
    try {
        // console.log("KQ", req.body);
        const { email, password } = req.body;
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Dung bieu thuc chinh quy de test email.
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
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
        } else {
            const response = await UserService.loginUser(req.body);
            const { refresh_token, ...newAccessToken } = response;
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
            });
            return res.status(200).json({ ...newAccessToken, refresh_token });
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const UpdateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("idUserController: ", userId);
        if (!userId) {
            return res.json({
                status: "ERROR",
                message: "You can't update this user, cause user not isset!"
            })
        } else {
            const response = await UserService.UpdateUser(userId, req.body);
            console.log("updateUser");
            return res.status(200).json(response);
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
            const response = await UserService.DeleteUser(userId);
            return res.status(200).json({ data: response });
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const GetAllUserController = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const DetailUserController = async (req, res) => {
    console.log("DetailUser: ", req.headers.token);
    try {
        const getId = req.params.id;
        const response = await UserService.getDetailUser(getId);
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const RefreshTokenController = async (req, res) => {
    try {
        const cookies_token = req.body.headers.token; // or req.headers.token
        // console.log("move: ", cookies_token);
        if (!cookies_token) {
            return res.json({
                status: "ERROR",
                message: "You must have this user, cause user not isset!"
            })
        } else {
            // const response = await jwtService.generalAccess_Token_User(cookies_token);
            const response = await UserService.RefreshTokenUserService(cookies_token);
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}
const LogoutUserController = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        // console.log("res: ", res);
        // console.log("req: ", req);
        return res.status(200).json({
            status: "OK",
            message: "You have LogOut SuccessFully!"
        })
    } catch (error) {
        return res.status(400).json({
            status: "ERROR",
            message: "You haven't logout success!"
        })
    }
}
const DeleteMutipleController = async (req, res) => {
    try {
        const idAdmin = req.body._id; // if admin for delete else error
        if (!idAdmin) {
            console.log("You haven't delete");
        } else {
            const response = await UserService.deleteMutipleUserService(idAdmin);
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(400).json({
            status: "ERROR",
            message: "You haven't logout success!"
        })
    }
}
module.exports = { CreateUserController, LoginUserController, UpdateUserController, DeleteUserController, GetAllUserController, DetailUserController, RefreshTokenController, LogoutUserController, DeleteMutipleController };