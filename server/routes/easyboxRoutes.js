const express = require('express');
const {
    reserveEasybox,
    checkEasybox,
    updateEasybox, // Add the new update controller
} = require('../controllers/easyboxController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Easybox routes
router.post('/reserve', authenticateToken, authorizeRole('client'), reserveEasybox);
router.post('/reservations/check', authenticateToken, checkEasybox);
router.patch('/update', authenticateToken, updateEasybox); // New update route

module.exports = router;
