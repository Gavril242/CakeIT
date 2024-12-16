const express = require('express');
const multer = require('multer');
const { register, login, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes for authentication
router.post('/register', upload.single('image'), register); // Add multer middleware here
router.post('/login', login);
router.post('/logout', authenticateToken, logout);

module.exports = router;
