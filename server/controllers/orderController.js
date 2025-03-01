const Order = require('../models/order');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;
        const newOrder = new Order({ userId, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error placing order' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId items.itemId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};