const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[0];  // Nhan token tu khi click su kien delete
    // console.log("token at authMiddleware: ", req.headers.token.split(" "));
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        console.log("User: ", user);
        if (err) {
            return res.json({
                status: "ERROR",
                message: "The authentication not confirm!"
            })
        } else {
            const { payload } = user;
            if (payload.isAdmin !== true) {
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
    const token = req.headers.token.split(" ")[0];  // Nhan token tu khi click su kien delete
    // console.log("token at authMiddleware: ", req.headers.token.split(" "));
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.json({
                status: "ERROR",
                message: "The authentication not confirm!"
            })
        } else {
            const { payload } = user;
            // console.log(payload.id);
            // console.log(userId);
            if (payload?.isAdmin !== true || payload.id !== userId) {
                // console.log("chay loi", payload.isAdmin !== true, payload.id !== userId, userId);
                return res.json({
                    status: "ERROR",
                    message: "Ban dang co y nhap sai nguoi dung de dang nhap trai phep!"
                })
            } else {
                next();
            }
        }
    });
}

module.exports = { AuthMiddleWare, AuthMiddleWareUser }