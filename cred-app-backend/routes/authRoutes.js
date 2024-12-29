const express = require('express');
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
    console.log('Request received at /register'); // Debug log
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Return the user details and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
router.post('/register', async (req, res) => {
    console.log('Request received at /register'); // Debug log
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Return the user details and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log error details
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
