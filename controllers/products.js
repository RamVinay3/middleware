const Product = require('../models/product');

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ADD VARIANT
exports.createProductVariant = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    product.variants.push(req.body);

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET VARIANTS
exports.getProductVariants = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product.variants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE VARIANT
exports.updateProductVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    const product = await Product.findOne({
      "variants._id": variantId
    });

    const variant = product.variants.id(variantId);

    Object.assign(variant, req.body);

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE VARIANT
exports.deleteProductVariant = async (req, res) => {
  try {
    const { variantId } = req.params;

    const product = await Product.findOne({
      "variants._id": variantId
    });

    product.variants.pull(variantId);

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

