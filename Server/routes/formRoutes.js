const express = require("express");
const router = express.Router();
const verifyToken= require('../middleware/verifyToken');
const formController=require('../controller/formController')



router.post("/save_dynamic_form/:slug",verifyToken,formController.saveDynamicForm)
router.post("/important_exam",verifyToken,formController.exam)
router.post("/seminar",verifyToken,formController.seminar)
router.post("/conference",verifyToken,formController.conference)
router.post("/bootcamp",verifyToken,formController.bootcamp)
router.post("/day_celebration",verifyToken,formController.day_celebration)
router.post("/hackathon",verifyToken,formController.hackathon)
router.post("/industrial_visit",verifyToken,formController.industrial_visit)
router.post("/alumini_meet",verifyToken,formController.alumini_meet)
router.post("/workshop",verifyToken,formController.workshop)
router.post("/convocation",verifyToken,formController.convocation)
router.post("/scholarship",verifyToken,formController.scholarship)
router.post("/oath_ceremony",verifyToken,formController.oath_ceremony)
router.post("/aamod",verifyToken,formController.aamod)
router.post("/techvyom",verifyToken,formController.techvyom)
router.post("/zest",verifyToken,formController.zest)
router.post("/patent",verifyToken,formController.patent)
router.post("/guest_lecture",verifyToken,formController.guest_lecture)

router.get("/get-table-data",formController.get_table_data)
router.get("/get-post/:activity_name/:id",formController.get_post_data)
router.post("/delete-post",verifyToken,formController.delete_post)

module.exports = router;