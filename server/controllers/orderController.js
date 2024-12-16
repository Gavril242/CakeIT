const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { bakeryId, products, pickupOption, deliveryAddress, transportCost, notes } = req.body;

        // Validate required fields
        if (!products || products.length === 0) {
            console.error('Products array is missing or empty:', products);
            return res.status(400).json({ message: 'No products provided for the order.' });
        }

        if (!products.every((product) => product.productId)) {
            console.error('Product ID is missing in some products:', products);
            return res.status(400).json({ message: 'Each product must have a valid productId.' });
        }

        if (pickupOption === 'delivery' && !deliveryAddress) {
            return res.status(400).json({ message: 'Delivery address is required for delivery option.' });
        }

        // Calculate total price
        const productsTotal = products.reduce((sum, product) => {
            if (!product.price || !product.quantity) {
                throw new Error('Product price and quantity are required.');
            }
            return sum + product.price * product.quantity;
        }, 0);

        const totalPrice = productsTotal + transportCost;

        // Create a new order
        const newOrder = new Order({
            clientId: req.user.id, // Authenticated user
            bakeryId,
            products: products.map((product) => ({
                productId: product.productId,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            })),
            status: 'pending',
            totalPrice,
            transportCost,
            pickupOption,
            deliveryAddress,
            notes,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).json({ message: 'Server error. Unable to create order.' });
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
