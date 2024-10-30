const express = require('express'); // Import Express
const connectDB = require('./config/db'); // Import MongoDB connection function
const cors = require('cors'); // Import CORS for cross-origin requests
require('dotenv').config(); // Load environment variables

const app = express(); // Initialize Express app
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests

// Test route
app.get('/', (req, res) => res.send('Server is up and running'));

// Server Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));