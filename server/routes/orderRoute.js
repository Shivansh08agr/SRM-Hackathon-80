const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place an order
router.post('/place', orderController.placeOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

module.exports = router;