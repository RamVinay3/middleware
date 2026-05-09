// models/product.model.js

const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  label: String,
  quantityLabel: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: Number
}, { _id: true });

const productImagesSchema = new mongoose.Schema({
  thumbnail: String,
  main: String,
  gallery: [String]
}, { _id: false });

const productAttributeSchema = new mongoose.Schema({
  name: String,
  value: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: productImagesSchema,
  category: { type: String, index: true },
  variants: [productVariantSchema],
  isAvailable: { type: Boolean, default: true },
  isVeg: Boolean,
  shortDescription: String,
  attributes: [productAttributeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);