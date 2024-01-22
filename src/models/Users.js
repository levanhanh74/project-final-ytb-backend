const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModels = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
        city: { type: String }
    },
    {
        timestamps: true
    });
module.exports = mongoose.model("User", UserModels);
