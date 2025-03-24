const express = require("express");
const router = express.Router();

const adminController=require('../controller/adminController')


router.get("/getEmail",adminController.getEmail)
router.post("/updateStatus",adminController.updateStatus)
router.post("/deleteDynamicForm",adminController.deleteFormById)
router.get("/getDynamicForms/:activity_name",adminController.getAllDynamicForms)
router.get("/getForms",adminController.getAllForms)
router.get("/getForm/:slug",adminController.getFormBySlug)
router.post("/addForm",adminController.saveForm)
router.post("/getUsers",adminController.getUsers)
router.post("/email",adminController.email)

module.exports = router;