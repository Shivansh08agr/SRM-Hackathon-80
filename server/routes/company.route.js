const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware.js');
const { registerCompanyUser } = require('../controllers/companyuser.controller.js');

router.route('/company/register').post(registerCompanyUser);
router.route('/company/login').post(addItem);
