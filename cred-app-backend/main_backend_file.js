const express = require('express');
const connectDB = require('./config/db'); // Import the database connection
require('dotenv').config(); // Load environment variables

const app = express();

// Debugging logs
console.log('Connecting to MongoDB...');
connectDB();
console.log('MongoDB connection initiated.');

// Middleware to parse JSON
app.use(express.json());

// Import and register routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes
console.log('Authentication routes loaded.');
app.use('/api/auth', authRoutes);
console.log('Authentication routes registered.');

// Basic root route (optional, for testing)
app.get('/', (req, res) => {
    res.send('Server is running and database connected!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
