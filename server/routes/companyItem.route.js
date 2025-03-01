const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const companyController = require('../controllers/item/item.controller.js');

// Item routes
router.get('/getall/:id', companyController.getAllItems);
router.post('/add/:id' ,companyController.addItem);
router.put('/:id', companyController.updateItem);

module.exports = router;
