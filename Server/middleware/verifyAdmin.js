


//middleware to verify whether the token coming from the client has admin privileges

const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyAdmin = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);




        // Check if the user role is 'admin'
        console.log(decoded.role)
        if (decoded.role !== 'admin'&&  decoded.role !== 'principal') {
            return res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions' });
        }


        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = verifyAdmin;
