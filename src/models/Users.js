const mongoose = require('mongoose');
const { Schema } = mongoose;

const AvatarSchema = new Schema({
    url: { type: String, default: "" },
    name: { type: String, default: "" }
});
const UserModels = new Schema(
    {
        name: { type: String, default: "" },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String, default: "" },
        address: { type: String, default: "" },
        avatar: { type: AvatarSchema },
        city: { type: String, default: "" }
    },
    {
        timestamps: true
    });
module.exports = mongoose.model("User", UserModels);
