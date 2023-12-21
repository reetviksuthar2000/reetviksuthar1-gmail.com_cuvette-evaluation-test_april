const mongoose = require('mongoose');

const cartModalSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref:"User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }

});

module.exports = mongoose.model('Cart', cartModalSchema);