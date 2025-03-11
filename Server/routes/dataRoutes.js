const express = require("express");
const router = express.Router();

const dataController=require('../controller/dataController')


router.post("/get_activity_count",dataController.get_activity_count)


module.exports = router;