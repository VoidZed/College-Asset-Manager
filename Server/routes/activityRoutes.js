const express = require('express');
const router = express.Router();
const { get_activity_count } = require('../controller/dataController');

// Route for getting activity count
router.post('/get_activity_count', get_activity_count);

// Add other activity-related routes here

module.exports = router;