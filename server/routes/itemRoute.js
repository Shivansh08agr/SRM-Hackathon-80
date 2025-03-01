const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getAllItems);

// Add a new item
router.post('/', itemController.addItem);

module.exports = router;