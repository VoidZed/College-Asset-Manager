const express = require("express");
const router = express.Router();
const verifyAdmin= require('../middleware/verifyAdmin');
const adminController=require('../controller/adminController')


router.get("/getEmail",verifyAdmin,adminController.getEmail)
router.post("/updateStatus",verifyAdmin,adminController.updateStatus)
router.post("/deleteDynamicForm",verifyAdmin,adminController.deleteFormById)
router.get("/getDynamicForms/:activity_name",verifyAdmin,adminController.getAllDynamicForms)
router.get("/getForms",verifyAdmin,adminController.getAllForms)
router.get("/getForm/:slug",verifyAdmin,adminController.getFormBySlug)
router.post("/addForm",verifyAdmin,adminController.saveForm)
router.post("/getUsers",verifyAdmin,adminController.getUsers)
router.post("/email",verifyAdmin,adminController.email)

module.exports = router;