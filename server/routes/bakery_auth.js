const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Bakery = require('../models/Bakery');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save images
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Register Bakery Route
router.post('/register_bakery', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password, location, description, rating } = req.body;

        // Check if bakery already exists
        const existingBakery = await Bakery.findOne({ email });
        if (existingBakery) {
            return res.status(400).json({ message: 'Bakery already exists' });
        }

        // Hash password
        const passwordHashed = await bcrypt.hash(password, 10);

        // Save bakery to the database
        const newBakery = new Bakery({
            id: Date.now(), // Generate a unique ID
            name,
            email,
            passwordHashed,
            location,
            description,
            rating: rating || 0, // Default to 0 if not provided
            imagePath: req.file ? `${req.protocol}://5001/uploads/${req.file.filename}` : null
        });

        await newBakery.save();

        res.status(201).json({ message: 'Bakery registered successfully', bakery: newBakery });
    } catch (err) {
        console.error("Error registering bakery:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Bakery Route
router.post('/login-bakery', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if bakery exists
        const bakery = await Bakery.findOne({ email });
        if (!bakery) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, bakery.passwordHashed);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: bakery._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store the token in an HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout Route
router.post('/logout_bakery', (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out' });
});

// Middleware to Verify Token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Protected Route Example
router.get('/profile_bakery', authenticateToken, async (req, res) => {
    try {
        const bakery = await Bakery.findById(req.user.id).select('-passwordHashed');
        if (!bakery) {
            return res.status(404).json({ message: 'Bakery not found' });
        }
        res.status(200).json(bakery);
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;