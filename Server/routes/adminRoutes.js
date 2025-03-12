const express = require("express");
const router = express.Router();

const adminController=require('../controller/adminController')




router.post("/getUsers",adminController.getUsers)

module.exports = router;