const express = require('express');
const connectDB = require('./config/db'); // Import the database connection
require('dotenv').config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Define a basic route
app.get('/', (req, res) => {
    res.send('Server is running and database connected!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
