const express=require('express');
const router=express.Router();


const authRoutes=require('./auth');
const userRoutes=require('./users');
const productRoutes=require('./products');
const cartRoutes=require('./cart');


router.use('/auth',authRoutes);
router.use('/user',userRoutes);
router.use('/product',productRoutes);
router.use('/cart',cartRoutes);
module.exports=router;