const express = require("express");
const router = express.Router();
const verifyToken= require('../middleware/verifyToken');
const authController=require('../controller/authController')



router.post("/signup",authController.signup)
router.post("/login",authController.login)
router.post("/logout",authController.logout)
router.get("/validate-session",authController.validateSession)
router.post("/cloud-sign",verifyToken,authController.cloud_sign)
module.exports = router;