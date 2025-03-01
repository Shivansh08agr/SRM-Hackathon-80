const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const cartItem = await Cart.findOneAndUpdate(
            { itemId },
            { $inc: { quantity } },
            { upsert: true, new: true }
        );
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        await Cart.findOneAndDelete({ itemId });
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing from cart' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('itemId');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
};