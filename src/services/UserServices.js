const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const generalToken = require('../services/jwtService');

const createUser = (newUser) => {
    const { email, password } = newUser;
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
                    email,
                    password: bcrypt.hashSync(password, saltRound),
                });
                console.log(newUsers);
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
    const { email, password } = LoginUser;
    return new Promise(async (resolve, rejects) => {
        try {
            const checkEmail = await Users.findOne({ email });
            // console.log(": ", checkEmail);
            if (checkEmail === null) {
                resolve({
                    status: "ERROR",
                    message: "This user not isset, please email difference!"
                })
            } else {
                const checkPass = bcrypt.compareSync(password, checkEmail.password);
                // console.log("CheckPass: ", checkPass); // boolean 
                const access_token = await generalToken.generalAccess_Token({
                    id: checkEmail.id,
                    isAdmin: checkEmail.isAdmin,
                });  // access_token 
                const refresh_token = await generalToken.generalRefresh_Token({
                    id: checkEmail.id,
                    isAdmin: checkEmail.isAdmin,
                });  // refresh_token 
                // console.log(checkEmail);
                // console.log("refresh_token: ", refresh_token);
                // console.log("access_token: ", access_token);
                if (checkPass) {
                    await resolve({
                        status: "OK",
                        message: "Login User successfully",
                        data: checkEmail, // GetData new from dataBase
                        access_token,
                        refresh_token
                    })
                } else {
                    await resolve({
                        status: "ERROR",
                        message: "Login User UnSuccessfully",
                        data: checkPass === true ? checkEmail : "Password or email error!"
                    })
                }
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}
const UpdateUser = (checkId, UpdateUser) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const checkIds = await Users.findOne({ _id: checkId });
            // console.log("KQ checkID: ", checkIds);
            if (checkIds === null) {
                return resolve({
                    status: "ERROR update User",
                    message: "You haven't update user!"
                })
            } else {
                const updateUsers = {
                    ...UpdateUser,
                    password: bcrypt.hashSync(UpdateUser.password, 8),
                }

                // console.log(updateUsers);
                const updateUser = await Users.findByIdAndUpdate(checkIds.id, updateUsers, { new: true });
                /// findByIdAndUpdate('idNeedUpdate', {dataUpdate}, {new: "If true it willl display value new current, then it will display value that before. "})
                // console.log(updateUser);
                if (updateUser) {
                    return resolve({
                        status: "OK",
                        message: "You have update User SuccessFully!",
                        dataUpdate: updateUser
                    })
                }
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}
const DeleteUser = (checkId) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const checkIds = await Users.find({ _id: checkId });
            // console.log("KQ checkDelete: ", checkIds[0]._id);

            if (checkIds === null) {
                return resolve({
                    status: "ERROR update User",
                    message: "You haven't delete user!"
                })
            } else {
                const deleteUser = await Users.findByIdAndDelete(checkIds[0]._id, { new: true });
                /// findByIdAndDelete('idNeedUpdate', {new: "If true it willl display value new current, then it will display value that before. "})
                return resolve({
                    status: "OK",
                    message: "You have Delete User SuccessFully!",
                    dataNew: deleteUser
                })
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, rejects) => {
        try {
            const getAllUser = await Users.find();
            // console.log(getAllUser);
            if (!getAllUser) {
                return resolve.json({
                    status: "OK",
                    message: "All can't isset or ERROR!"
                })
            } {
                return resolve({
                    status: "OK",
                    message: "GetAllUser SuccessFully!",
                    dataNew: getAllUser
                });
            }

        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}
const getDetailUser = (checkId) => {
    return new Promise(async (resolve, rejects) => {
        try {
            const checkIds = await Users.find({ _id: checkId });
            // console.log(checkIds);

            if (checkIds === null) {
                return resolve({
                    status: "ERROR Find User",
                    message: "This User not isset!"
                })
            } else {
                const getOneUser = await Users.findOne({ _id: checkId });
                // console.log("getOneUser: ", getOneUser);
                return resolve({
                    status: "OK",
                    message: "This getOne User SuccessFully!",
                    dataNew: getOneUser
                })
            }
        } catch (error) {
            console.log("Loi o userService!");
            rejects(error)
        }
    })
}

const RefreshTokenUserService = async (token) => {
    if (!token) {
        console.log("Your token not isset or false!!");
    } else {
        return await generalToken.generalAccess_Token_User(token);
    }
}

module.exports = { createUser, loginUser, UpdateUser, DeleteUser, getAllUser, getDetailUser, RefreshTokenUserService };
