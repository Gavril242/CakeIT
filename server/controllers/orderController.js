const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Get orders for a specific bakery
const getOrdersByBakery = async (req, res) => {
    try {
        const { bakeryId } = req.params;
        const orders = await Order.find({ bakeryId })
            .populate('clientId', 'name email') // Include client details
            .populate('products.productId', 'name price'); // Include product details

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this bakery' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders for bakery:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Get all orders for an admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('clientId bakeryId products.productId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get orders for a specific client
const getOrdersByClient = async (req, res) => {
    try {
        const orders = await Order.find({ clientId: req.user.id }).populate('products.productId');
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an order status
const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, getAllOrders, getOrdersByClient, updateOrderStatus, getOrdersByBakery  };
