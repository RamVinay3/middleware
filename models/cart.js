// models/cart.model.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  variantId: mongoose.Schema.Types.ObjectId,
  variantLabel: String,
  quantityLabel: String,
  price: Number,
  originalPrice: Number,
  quantity: {
    type: Number,
    default: 1
  },
  url: {
    thumbnail: String,
    main: String
  }
}, { _id: true });

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);