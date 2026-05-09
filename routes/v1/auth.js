const express=require('express');
const router=express.Router();

const authController=require('../../controllers/auth');
const {authMiddleware} = require('../../middleware/isAuthenticated');

router.post('/login',authController.loginUser);
router.post('/signup',authController.registerUser);
router.post('/refreshtoken',authController.refreshAccessToken);
router.get('/logout',authMiddleware,authController.logoutUser);
router.get('/current-user',authMiddleware,authController.getCurrentUser);


module.exports = router;