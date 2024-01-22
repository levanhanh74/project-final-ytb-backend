const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const generalAccess_Token = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: "3s" });
    return access_token;
    // expiresIn : đó là thời hạn token tồn tại.
};
const generalRefresh_Token = (payload) => {
    return jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: "365d" });
    // expiresIn : đó là thời hạn token tồn tại.
    // refresh_token là khi chúng ta sử dụng  login vào rồi thì vào lại thì nó sẽ tạo ra cho ta một cái token mới.
}

const generalAccess_Token_User = async (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            resolve({
                status: "ERROR",
                message: "Token user haven't or not isset!"
            })
        } else {
            //    Here it get token, but verify not true
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERR",
                        message: "This token not isset and not authentication!"
                    })
                } else {
                    console.log("JWTService: ", user);
                    const access_token = await generalAccess_Token({
                        id: user?.id,
                        isAdmin: user?.isAdmin
                    })
                    resolve({
                        status: "Successfully",
                        message: "AccessToken to Refresh_Token successfully",
                        access_token,
                    })
                }
            })
        }
    })
}

//  Note :   ===========jwt.sign({data}, "nametokentao", {"timeEnd"});=======
module.exports = { generalAccess_Token, generalRefresh_Token, generalAccess_Token_User }