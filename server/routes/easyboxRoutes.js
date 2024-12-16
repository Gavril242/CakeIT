const express = require('express');
const {
    reserveEasybox,
    openEasybox,
    closeEasybox,
} = require('../controllers/easyboxController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Easybox routes
router.post('/reserve', authenticateToken, authorizeRole('admin'), reserveEasybox);
router.post('/open', authenticateToken, authorizeRole('admin'), openEasybox);
router.post('/close', authenticateToken, authorizeRole('admin'), closeEasybox);

module.exports = router;
