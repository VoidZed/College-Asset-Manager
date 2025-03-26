const express = require('express');
const router = express.Router();
const { generateActivityPDF } = require('../controller/pdfController');
const verifyToken= require('../middleware/verifyToken');
// Route for generating activity PDF
router.post('/generate_activity_pdf', verifyToken,generateActivityPDF);

module.exports = router;