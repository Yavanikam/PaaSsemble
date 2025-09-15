const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load env variables (SECRET_KEY)
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');  // Get token from headers
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;  // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;
