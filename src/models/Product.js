const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductModels = new Schema({
    name: { type: String, required, unique },
    image: { type: String, required },
    type: { type: String, required },
    price: { type: Number, required },
    countInStock: { type: Number, required },
    rating: { type: Number, required },
    description: { type: String, required },
},
    {
        timestamps
    });
module.exports = mongoose.model('Product', ProductModels);