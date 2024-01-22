const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[0];  // Nhan token tu khi click su kien delete
    // console.log("token at authMiddleware: ", req.headers.token.split(" "));
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        console.log("UserAuth: ", user);
        if (err) {
            return res.json({
                status: "ERROR",
                message: "The authentication not confirm!"
            })
        } else {
            if (user?.isAdmin !== true) {
                return res.json({
                    status: "ERROR",
                    message: "You mustn't is admin! You must is admin new delete this account."
                })
            } else {
                next();
            }
        }
    });
}
const AuthMiddleWareUser = (req, res, next) => {
    const token = req.headers.token.split(' ')[0]  // Nhan token tu khi click su kien delete
    const userId = req.params.id;
    console.log("tokenGetDetail: ", token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        console.log("UserAuThen: ", user);
        if (err) {
            return res.json({
                status: "ERROR",
                message: "The authentication not confirm access_token!",
            })
        } else {
            // console.log("user: ", user.id, "userId: ", userId, userId === user.id, user?.isAdmin);
            if (userId === user?.id || user?.isAdmin) { // if user or admin then next 
                next();
            } else {
                return res.json({
                    status: "ERROR",
                    message: "Ban dang co y nhap sai nguoi dung de dang nhap trai phep!"
                })
            }
        }
    });
}

module.exports = { AuthMiddleWare, AuthMiddleWareUser }