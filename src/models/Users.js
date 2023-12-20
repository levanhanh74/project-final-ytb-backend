const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModels = new Schema({
    name: { type: String, required },
    email: { type: String, unique, required },
    password: { type: String, required },
    isAdmin: { type: Boolean, default: false, required },
    phone: { type: Number, required },
    access_token: { type: String, required },
    refresh_token: { type: String, required }
},
{
    timestamps
});
module.exports = mongoose.model("User", UserModels);
