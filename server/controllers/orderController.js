const Order = require('../models/order');
const mongoose = require('mongoose');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        // Validate items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }

        // Validate each item in the items array
        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.itemId)) {
                return res.status(400).json({ error: 'Invalid itemId format' });
            }
            if (typeof item.quantity !== 'number' || item.quantity <= 0) {
                return res.status(400).json({ error: 'Quantity must be a positive number' });
            }
        }

        // Calculate total amount (optional: you can calculate this on the frontend or backend)
        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Create the order
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
        });

        // Save the order to the database
        await newOrder.save();

        // Return the created order
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: newOrder,
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Error placing order', details: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const { id: userId } = req.params; // Correctly extract userId from req.params

        // Debug: Log the userId to verify it's being extracted correctly
        console.log('Received userId:', userId);

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid userId format',
            });
        }

        // Fetch all orders for the given userId
        const orders = await Order.find({ userId });

        // Return the orders
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message,
        });
    }
};