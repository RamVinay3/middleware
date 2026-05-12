
// controllers/cart.controller.js

const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // assume auth middleware
    const { productId, variantId, quantity } = req.body;

    const product = await Product.findById(productId);

    const variant = product.variants.id(variantId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      item =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        productName: product.name,
        variantId,
        variantLabel: variant.label,
        quantityLabel: variant.quantityLabel,
        price: variant.price,
        originalPrice: variant.originalPrice,
        quantity,
        url: product.image
      });
    }

    // recalc total
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.addItemsToCart=async(req,res)=>{
  // console.log(req.user);
   try {

    const userId = req.user.userId;
    const  items = req.body;
    if (!Array.isArray(items) || !items.length) {

      return res.status(400).json({
        success: false,
        message: 'Cart items are required'
      });

    }

    let cart = await Cart.findOne({ userId });

    /**
     * Create cart if not exists
     */
    if (!cart) {

      cart = await Cart.create({
        userId,
        items: []
      });

    }

    /**
     * Add/update items
     */
    items.forEach((incomingItem) => {
      console.log(cart.items);
      const existingItem =
        cart.items.find((item) => {
          
          return (
            item.productId?.toString() ===
              incomingItem.productId &&
            item.variantId ===
              incomingItem.variantId
          );

        });

      /**
       * If item already exists
       * increase quantity
       */
      if (existingItem) {

        existingItem.quantity +=
          incomingItem.quantity;

      }

      /**
       * Else push new item
       */
      else {

        cart.items.push({
          productId: incomingItem.productId,
          variantId: incomingItem.variantId,
          quantity: incomingItem.quantity
        });

      }

    });

    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Items added to cart',
      cart
    });

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });

  }

}
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });

    const item = cart.items.id(itemId);
    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    cart.items.pull(req.params.itemId);

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};