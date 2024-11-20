const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await Client.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Save user to the database
        const newUser = new Client({ username, email, passwordHash, firstName, lastName, phone, address });
        await newUser.save().catch(err => {
            console.error("Error saving user:", err);
            res.status(500).json({ message: "Failed to save user" });
        });
        console.log(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Client.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store the token in an HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "strict",
        });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
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
router.get('/profile', authenticateToken, async (req, res) => {
    const user = await Client.findById(req.user.id).select('-passwordHash');
    res.status(200).json(user);
});

module.exports = router;