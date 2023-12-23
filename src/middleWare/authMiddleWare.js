const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(" ")[0];  // Nhan token tu khi click su kien delete
    // console.log("token at authMiddleware: ", req.headers.token.split(" "));
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        // console.log("Delete User: ", user);
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
module.exports = { AuthMiddleWare }