const express = require('express');
const authenticate = require('../middleware/authMiddleware');  // Import middleware
const User = require('../models/User');
const router = express.Router();

// Protected route (GET /user)
router.get('/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);  // Get user by decoded ID
        res.json(user);  // Send user data
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
