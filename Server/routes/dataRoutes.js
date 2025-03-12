const express = require("express");
const router = express.Router();

const dataController=require('../controller/dataController')


router.post("/get_activity_count",dataController.get_activity_count)
router.get("/export/:format/:db/:year/:sem",dataController.exportData)

module.exports = router;