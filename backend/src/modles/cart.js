const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;