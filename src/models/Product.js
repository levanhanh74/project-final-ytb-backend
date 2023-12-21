const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductModels = new Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    });
module.exports = mongoose.model('Product', ProductModels);