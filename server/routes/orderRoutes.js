const express = require('express');
const {
  createOrder,
  getOrdersByClient,
  updateOrderStatus,
  getAllOrders,
  getOrdersByBakery
} = require('../controllers/orderController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Order routes
// Get orders for a specific bakery
router.get('/bakery/:bakeryId', authenticateToken, authorizeRole('bakery'), getOrdersByBakery);
router.post('/', authenticateToken, authorizeRole('client'), createOrder);
router.get('/client', authenticateToken, authorizeRole('client'), getOrdersByClient);
router.get('/admin', authenticateToken, authorizeRole('admin'), getAllOrders);
router.patch('/:id', authenticateToken, authorizeRole('admin'), updateOrderStatus);

module.exports = router;
