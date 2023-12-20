const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderProductModel = new Schema({
    orderItems: [
        {
            name: { type: String, required },
            amount: { type: Number, required },
            image: { type: String, required },
            price: { type: Number, required },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required },
        }
    ],
    shippingAddress: {
        fullName: { type: String, required },
        address: { type: String, required },
        city: { type: String, required },
        country: { type: String, required },
        phone: { type: Number, required },
    },
    paymentMethod: { type: String, required },
    itemsPrice: { type: Number, required },
    shippingPrice: { type: Number, required },
    taxPrice: { type: Number, required },
    totalPrice: { type: Number, required },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required },
    isPaid: { type: Boolean, required },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, },
}, {
    timestamps
});
module.exports = mongoose.model("OrderProduct", OrderProductModel)