const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Assuming you have a model for registration

// Route to handle registration
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, contactNumber,event } = req.body;

    // Validation
    if (!fullName || !email || !contactNumber || !event ) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    // Create new registration entry
    const newRegistration = new Registration({
     name: fullName,
      email,
      contact: contactNumber,
      event
    });

    // Save to database
    await newRegistration.save();

    // Respond with success
  // Send JSON response
  return res.status(201).json({ message: 'Registration successful!', 
  registrationId: newRegistration._id });
} catch (error) {
  console.error('Error during registration:', error);
  return res.status(500).json({ message: 'Internal server error.' })
  }
});

module.exports = router;
