const express = require('express');
const router = express.Router();
const { generateActivityPDF } = require('../controller/pdfController');

// Route for generating activity PDF
router.post('/generate_activity_pdf', generateActivityPDF);

module.exports = router;