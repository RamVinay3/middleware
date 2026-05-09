// routes/order.routes.js

const express = require('express');
const router = express.Router();


const orderController = require('../../controllers/order');

router.post('/orders', orderController.createOrder);
router.patch('/orders/:orderId/cancel', orderController.cancelOrder);

module.exports = router;