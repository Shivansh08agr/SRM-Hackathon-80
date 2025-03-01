const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const companyController = require('../controllers/item/item.controller.js');

// Item routes
router.get('/items', companyController.getAllItems);
router.post('/items', companyController.addItem);
router.put('/items/:id', companyController.updateItem);

module.exports = router;
