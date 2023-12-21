const jwt = require('jsonwebtoken');

const generalAccess_Token = (payload) => {
    const access_token = jwt.sign({
        payload
    }, "access_token", { expiresIn: "1h" });
    return access_token;
    // expiresIn : đó là thời hạn token tồn tại.
};
const generalRefresh_Token = (payload) => {
    return jwt.sign({
        payload
    }, "refresh_token", { expiresIn: "365d" });
    // expiresIn : đó là thời hạn token tồn tại.
    // refresh_token là khi chúng ta sử dụng  login vào rồi thì vào lại thì nó sẽ tạo ra cho ta một cái token mới.
}

//  Note :   ===========jwt.sign({data}, "nametokentao", {"timeEnd"});=======
module.exports = { generalAccess_Token, generalRefresh_Token }