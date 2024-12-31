const express = require('express');
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const bcrypt = require('bcrypt');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Profile route (protected)
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: `Welcome, user with ID: ${req.user}` });
});

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

        // Create a new user with a hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
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

// Login a user
router.post('/login', async (req, res) => {
    console.log('Request received at /login'); // Debug log
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Respond with user details and token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

console.log('User model loaded:', User);

module.exports = router;
