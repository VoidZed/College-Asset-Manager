const express = require("express");
const router = express.Router();
const verifyAdmin= require('../middleware/verifyAdmin');
const verifyToken= require('../middleware/verifyToken');
const adminController=require('../controller/adminController')


router.get("/getEmail",verifyAdmin,adminController.getEmail)
router.post("/updateStatus",verifyAdmin,adminController.updateStatus)
router.post("/deleteDynamicForm",verifyAdmin,adminController.deleteFormById)

router.get("/getDynamicForms/:activity_name",adminController.getAllDynamicForms)
router.get("/getForms",verifyAdmin,adminController.getAllForms)
router.get("/getForm/:slug",verifyToken,adminController.getFormBySlug)
router.post("/addForm",verifyAdmin,adminController.saveForm)
router.post("/getUsers",verifyAdmin,adminController.getUsers)
router.post("/email",verifyAdmin,adminController.email)
router.post("/delUser",verifyAdmin,adminController.delUser)

module.exports = router;