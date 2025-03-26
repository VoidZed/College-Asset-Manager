

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    next(); 
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = verifyToken;
