const express = require('express');
const router = express.Router();
const shopkeeperController = require('../controllers/shopkeeper/shopkeeper.controller');
const { authenticate } = require('../middlewares/authMiddleware');

// Register a new shopkeeper
router.post('/register', shopkeeperController.registerShopkeeper);

// Login shopkeeper
router.post('/login', shopkeeperController.loginShopkeeper);


module.exports = router;