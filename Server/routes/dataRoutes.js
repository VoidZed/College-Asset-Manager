const express = require("express");
const router = express.Router();

const dataController=require('../controller/dataController')

router.post("/create-notification",dataController.createNotification)
router.get("/get-notification",dataController.getNotifications)
router.post("/get_activity_count",dataController.get_activity_count)
router.get("/export/:format/:db/:year/:sem",dataController.exportData)
router.get("/get_photo_timeline/:activity_item",dataController.getPhotoTimeline)
router.post("/getProfileData",dataController.getProfileData)
module.exports = router;