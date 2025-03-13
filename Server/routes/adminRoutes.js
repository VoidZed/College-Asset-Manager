const express = require("express");
const router = express.Router();

const adminController=require('../controller/adminController')




router.post("/getUsers",adminController.getUsers)
router.post("/email",adminController.email)

module.exports = router;