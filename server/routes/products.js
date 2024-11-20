const express = require('express');
const Product = require('../models/Product');
const Bakery = require('../models/Bakery');

const router = express.Router();

// Create a product
router.post('/', async (req, res) => {
    const { bakeryId, name, description, price, customOptions } = req.body;

    try {
        const bakery = await Bakery.findById(bakeryId);
        if (!bakery) {
            return res.status(404).json({ message: 'Bakery not found' });
        }

        const product = new Product({ bakeryId, name, description, price, customOptions });
        await product.save();

        bakery.products.push(product._id);
        await bakery.save();

        res.status(201).json(product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('bakeryId', 'name');
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get products by bakery
router.get('/bakery/:bakeryId', async (req, res) => {
    try {
        const products = await Product.find({ bakeryId: req.params.bakeryId });
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products for bakery:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    const { name, description, price, customOptions, availability } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, customOptions, availability },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const bakery = await Bakery.findById(product.bakeryId);
        if (bakery) {
            bakery.products.pull(product._id);
            await bakery.save();
        }

        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;