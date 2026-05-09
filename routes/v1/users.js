const express = require("express");

const router= express.Router();


const {createProfile,getProfile,updateProfile,deleteProfile}=require('../../controllers/user');


router.post("/", createProfile);
router.get("/", getProfile);
router.patch("/", updateProfile);
router.delete("/", deleteProfile);
module.exports=router;