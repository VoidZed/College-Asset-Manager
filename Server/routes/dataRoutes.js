const express = require("express");
const router = express.Router();
const verifyToken= require('../middleware/verifyToken');
const dataController=require('../controller/dataController')

router.post("/create-notification",verifyToken,dataController.createNotification)
router.get("/get-notification",verifyToken,dataController.getNotifications)
router.post("/get_activity_count",verifyToken,dataController.get_activity_count)
router.get("/export/:format/:db/:year/:sem",verifyToken,dataController.exportData)
router.get("/get_photo_timeline/:activity_item",verifyToken,dataController.getPhotoTimeline)
router.post("/getProfileData",verifyToken,dataController.getProfileData)

module.exports = router;