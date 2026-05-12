// routes/order.routes.js

const express = require('express');
const router = express.Router();

const {authMiddleware} = require('../../middleware/isAuthenticated');


const orderController = require('../../controllers/order');

router.get('/orders', authMiddleware,orderController.createOrder);
router.patch('/orders/:orderId/cancel', orderController.cancelOrder);

module.exports = router;