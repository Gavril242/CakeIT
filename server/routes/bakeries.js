const express = require('express');
const Bakery = require('../models/Bakery');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all bakeries
router.get('/', async (req, res) => {
    try {
        const bakeries = await Bakery.find().populate('products');
        res.status(200).json(bakeries);
    } catch (err) {
        console.error('Error fetching bakeries:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a bakery by ID
router.get('/:id', async (req, res) => {
    try {
        const bakery = await Bakery.findById(req.params.id).populate('products');
        if (!bakery) {
            return res.status(404).json({ message: 'Bakery not found' });
        }
        res.status(200).json(bakery);
    } catch (err) {
        console.error('Error fetching bakery:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new bakery with an image
router.post('/', upload.single('image'), async (req, res) => {
    const { id, name, location, description, rating, products } = req.body;

    try {
        // Validate products array
        const validProducts = Array.isArray(products)
            ? products.filter((product) => mongoose.Types.ObjectId.isValid(product))
            : [];

        const newBakery = new Bakery({
            id,
            name,
            location,
            description,
            rating,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            products: validProducts, // Use validated products array
        });

        const savedBakery = await newBakery.save();
        res.status(201).json(savedBakery);
    } catch (err) {
        console.error('Error adding bakery:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Add a new bakery
router.post('/', async (req, res) => {
    const { id, name, location, description, rating, imageUrl, products } = req.body;

    try {
        const newBakery = new Bakery({
            id,
            name,
            location,
            description,
            rating,
            imageUrl,
            products, // This should be an array of product IDs or an empty array
        });

        const savedBakery = await newBakery.save();
        res.status(201).json(savedBakery);
    } catch (err) {
        console.error('Error adding bakery:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;