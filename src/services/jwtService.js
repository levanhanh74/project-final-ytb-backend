const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { use } = require('../routers/userRouter');
dotenv.config()

const generalAccess_Token = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: "20h" });
    return access_token;
    // expiresIn : đó là thời hạn token tồn tại.
};
const generalRefresh_Token = (payload) => {
    return jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: "365d" });
    // expiresIn : đó là thời hạn token tồn tại.
    // refresh_token là khi chúng ta sử dụng  login vào rồi thì vào lại thì nó sẽ tạo ra cho ta một cái token mới.
}

const generalAccess_Token_User = (token, resolve) => {
    // console.log("tokenJWT: ", resolve({ message: "successfully", token }));
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
            resolve({
                status: "ERR",
                message: "This token not isset and not authentication!"
            })
        } else {
            const { payload } = user;
            // console.log("KQ true");
            console.log("payload: ", payload);

            const access_token = await generalAccess_Token({
                id: payload.id,
                isAdmin: payload.isAdmin
            })
            resolve({
                status: "Successfully",
                message: "Refresh_Token successfully",
                refresh: access_token
            })
        }
    })
}

//  Note :   ===========jwt.sign({data}, "nametokentao", {"timeEnd"});=======
module.exports = { generalAccess_Token, generalRefresh_Token, generalAccess_Token_User }