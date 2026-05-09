// models/order.model.js

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  productName: String,

  variantId: mongoose.Schema.Types.ObjectId,
  variantLabel: String,
  quantityLabel: String,

  price: Number,          // snapshot price
  originalPrice: Number,  // snapshot

  quantity: Number,

  image: {
    thumbnail: String,
    main: String
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },

  items: [orderItemSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
      'PLACED',
      'CONFIRMED',
      'PREPARING',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
      'CANCELLED'
    ],
    default: 'PLACED'
  },

  cancelRemark: String,

  paymentStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING'
  },

  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE']
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);