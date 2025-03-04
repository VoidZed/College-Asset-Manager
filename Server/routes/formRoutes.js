const express = require("express");
const router = express.Router();

const formController=require('../controller/formController')

router.post("/guest_lecture",formController.guest_lecture)

module.exports = router;