const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bakery = require('../models/Bakery');
const Client = require('../models/Client');
const getNextId = async () => {
    const lastBakery = await Bakery.findOne().sort({ id: -1 }); // Sort by ID in descending order
    return lastBakery ? lastBakery.id + 1 : 1; // Increment ID if found, otherwise start from 1
};
// Register a new user
// Register a new user or bakery
const register = async (req, res) => {
    try {
        console.log('Incoming request to /register');
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { email, password, role, username, firstName, lastName, phone, address, name, location, description, rating } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            console.error('Missing required fields:', { email, password, role });
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash the password
        console.log('Hashing password...');
        const passwordHashed = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        if (role === 'bakery') {
            // Check if bakery already exists
            const existingBakery = await Bakery.findOne({ email });
            if (existingBakery) {
                console.warn(`Bakery with email ${email} already exists`);
                return res.status(400).json({ message: 'Bakery already exists' });
            }

            // Get the next available ID for the bakery
            console.log('Fetching next available ID for bakery...');
            const nextId = await getNextId();
            console.log(`Next available ID for bakery: ${nextId}`);

            // Create new bakery entry
            const newBakery = new Bakery({
                id: nextId,
                email,
                passwordHashed,
                name,
                location,
                description,
                rating: rating || null, // Ensure rating is nullable
                imageUrl: req.file ? req.file.filename : null, // Save GridFS file reference
            });

            console.log('Saving new bakery to the database...');
            await newBakery.save();
            console.log('Bakery registered successfully');

            return res.status(201).json({ message: 'Bakery registered successfully' });
        } else if (role === 'client') {
            // Validate required fields for clients
            if (!username || !firstName || !lastName || !phone || !address) {
                console.error('Missing required client fields:', { username, firstName, lastName, phone, address });
                return res.status(400).json({ message: 'Missing required client fields' });
            }

            // Check if client already exists
            const existingClient = await Client.findOne({ email });
            if (existingClient) {
                console.warn(`Client with email ${email} already exists`);
                return res.status(400).json({ message: 'Client already exists' });
            }

            // Create new client entry
            const newClient = new Client({
                username,
                email,
                passwordHash: passwordHashed,
                firstName,
                lastName,
                phone,
                address,
            });

            console.log('Saving new client to the database...');
            await newClient.save();
            console.log('Client registered successfully');

            return res.status(201).json({ message: 'Client registered successfully' });
        } else {
            console.error('Invalid role provided:', role);
            return res.status(400).json({ message: 'Invalid role' });
        }
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Log in a user
const login = async (req, res) => {
    console.log('Login endpoint hit');
    const { email, password, role } = req.body;
    console.log('Login request data:', { email, role });
    const Model = role === 'bakery' ? Bakery : Client;

    try {
        const user = await Model.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log('Comparing passwords...');
        const pass = role === 'bakery' ? user.passwordHashed : user.passwordHash;
        const isMatch = await bcrypt.compare(password, pass);
        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log('Generating JWT...');
        const secretKey = process.env.JWT_SECRET || 'default_secret_key'; // Use default as a fallback
        const token = jwt.sign({ id: user._id, role }, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        console.log('Login successful for user:', email);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Log out a user
const logout = (req, res) => {
    console.log('Logout endpoint hit');
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    console.log('User logged out');
    res.status(200).json({ message: 'Logged out' });
};

module.exports = { register, login, logout };
