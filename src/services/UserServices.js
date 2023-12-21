const Users = require("../models/Users");

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
                const newUsers = await Users.create({
                    name,
                    email,
                    password,
                    phone,
                    access_token: "access_tokens",
                    refresh_token: "refresh_tokens"
                });
                if (newUsers) {
                    await resolve({
                        status: "OK",
                        message: "successfully",
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
module.exports = { createUser };
