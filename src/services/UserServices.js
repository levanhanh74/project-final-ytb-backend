const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const generalAccess_Token = require('../services/jwtService');

const createUser = (newUser) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    return new Promise(async (resolve, rejects) => {
        try {
            const checkEmail = await Users.findOne({ email: email });
            if (checkEmail !== null) {
                resolve({
                    status: "ERROR",
                    message: "This email already, please email difference!"
                })
            } else {
                const saltRound = 8; // mean time attack, It can block attack.
                const newUsers = await Users.create({
                    name,
                    email,
                    password: bcrypt.hashSync(password, saltRound),
                    phone,
                    access_token: "access_tokens",
                    refresh_token: "refresh_tokens"
                });
                if (newUsers) {
                    await resolve({
                        status: "OK",
                        message: "Create User successfully",
                        data: newUsers,
                    })
                }
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}
const loginUser = (LoginUser) => {
    const { name, email, password, confirmPassword, phone } = LoginUser;
    return new Promise(async (resolve, rejects) => {
        try {
            const checkEmail = await Users.findOne({ email });
            if (checkEmail === null) {
                resolve({
                    status: "ERROR",
                    message: "This user not isset, please email difference!"
                })
            } else {
                const checkPass = bcrypt.compareSync(password, checkEmail.password);
                const access_token = await generalAccess_Token.generalAccess_Token({
                    id: checkEmail.id,
                    isAdmin: checkEmail.isAdmin,
                });  // access_token 
                const refresh_token = await generalAccess_Token.generalRefresh_Token({
                    id: checkEmail.id,
                    isAdmin: checkEmail.isAdmin,
                });  // refresh_token 
                // console.log(refresh_token);
                if (checkPass) {
                    await resolve({
                        status: "OK",
                        message: "Login User successfully",
                        data: checkEmail,
                        access_token,
                        refresh_token
                    })
                }
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}

module.exports = { createUser, loginUser };
