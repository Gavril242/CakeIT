const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import models
const Client = require('./models/Client');
const Bakery = require('./models/Bakery');
const Product = require('./models/Product');
const Order = require('./models/Order');
const EasyboxReservation = require('./models/EasyBoxReservation');

const orderRoutes = require('./routes/rderRoutes'); // Import order routes

// Use routes
app.use('/api/orders', orderRoutes); // Routes for orders

app.listen(3000, () => console.log("Server running on port 3000"));