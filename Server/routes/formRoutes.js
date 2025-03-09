const express = require("express");
const router = express.Router();

const formController=require('../controller/formController')



router.post("/oath_ceremony",formController.oath_ceremony)
router.post("/aamod",formController.aamod)
router.post("/techvyom",formController.techvyom)
router.post("/zest",formController.zest)
router.post("/patent",formController.patent)
router.post("/guest_lecture",formController.guest_lecture)

router.get("/get-table-data",formController.get_table_data)
router.get("/get-post/:activity_name/:id",formController.get_post_data)
router.post("/delete-post",formController.delete_post)

module.exports = router;