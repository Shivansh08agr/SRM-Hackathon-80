const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addToCart);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Get cart items
router.get('/', cartController.getCart);

module.exports = router;