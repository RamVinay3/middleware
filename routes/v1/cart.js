// routes/cart.routes.js

const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart');
const {authMiddleware} = require('../../middleware/isAuthenticated');
// console.log(authMiddleware,"auth Middleware")
// Cart routes
router.get('/items', authMiddleware, cartController.getCart);
router.post('/items',authMiddleware,cartController.addItemsToCart);
router.patch('/item/:itemId', cartController.updateCartItem);
router.delete('/item/:itemId', cartController.removeCartItem);
router.delete('/cart', cartController.clearCart);

module.exports = router;