const express=require('express');
const router=express.Router();

const productController=require('../../controllers/products');



// Product routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Product Variant routes
router.post('/products/:productId/variants', productController.createProductVariant);
router.get('/products/:productId/variants', productController.getProductVariants);
router.patch('/variants/:variantId', productController.updateProductVariant);
router.delete('/variants/:variantId', productController.deleteProductVariant);


module.exports = router;