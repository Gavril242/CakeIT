const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const Grid = require('gridfs-stream');

// Route imports
const authRoutes = require('./routes/authRoutes');
const bakeryRoutes = require('./routes/bakeryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const easyboxRoutes = require('./routes/easyboxRoutes');
const clientRoutes = require('./routes/clientRoutes');

dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Routes
app.use('/api/auth', authRoutes); // Handle image upload for auth
app.use('/api/bakeries', bakeryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/easybox', easyboxRoutes);
app.use('/api/clients', clientRoutes);

// MongoDB connection
const uri = process.env.MONGO_URI || MONGO_URI;


mongoose
    .connect(uri)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

const conn = mongoose.createConnection(uri);

// Initialize GridFS
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Collection name for GridFS
    console.log('GridFS initialized');
});
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));