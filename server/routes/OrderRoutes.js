const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// Route to create a new order
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;