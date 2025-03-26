const express = require('express');
const router = express.Router();
const { get_activity_count } = require('../controller/dataController');
const verifyToken= require('../middleware/verifyToken');

// Route for getting activity count
router.post('/get_activity_count',verifyToken, get_activity_count);

// Add other activity-related routes here

module.exports = router;