const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware.js');
const { registerCompanyUser, loginCompanyUser, getAllCompanyUsers, filterCompaniesByCategory } = require('../controllers/company/companyuser.controller.js');

router.route('/registercompany').post(registerCompanyUser);
router.route('/logincompany').post(loginCompanyUser);
router.route('/getallcompanies').get(getAllCompanyUsers);
router.route('/filter').get(filterCompaniesByCategory);

module.exports = router;