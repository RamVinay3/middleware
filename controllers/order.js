// controllers/order.controller.js

const Order = require('../models/order');
const Cart = require('../models/cart');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        variantId: item.variantId,
        variantLabel: item.variantLabel,
        quantityLabel: item.quantityLabel,
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: item.url
      })),
      totalAmount: cart.totalAmount,
      paymentMethod: req.body.paymentMethod
    });

    await order.save();

    // clear cart after order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { remark } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'DELIVERED') {
      return res.status(400).json({
        message: 'Delivered order cannot be cancelled'
      });
    }

    if (order.status === 'CANCELLED') {
      return res.status(400).json({
        message: 'Order already cancelled'
      });
    }

    order.status = 'CANCELLED';
    order.cancelRemark = remark;

    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

