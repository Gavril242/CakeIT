const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const bakeryRoutes = require('./routes/bakeries');

const bakeryauthRoutes = require('./routes/bakery_auth');
const productRoutes = require('./routes/products');


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust origin for production
app.use(cookieParser());


// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
// Routes
app.use('/api/bakeries', bakeryRoutes);
app.use('/api/products', productRoutes);

app.use('/api/bakery_auth', bakeryauthRoutes);
const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection URI
const uri = process.env.MONGO_URI || "mongodb+srv://cakeitadminuser:FZUoxyyxQe1UCGcO@cluster0.idwnz.mongodb.net/cakeit?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("MongoDB connection error:", err.message);
  });

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));