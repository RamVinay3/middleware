// routes/cart.routes.js

const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart');

// Cart routes
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.patch('/cart/item/:itemId', cartController.updateCartItem);
router.delete('/cart/item/:itemId', cartController.removeCartItem);
router.delete('/cart', cartController.clearCart);

module.exports = router;