const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CompanyUser = require('../../models/company/companyuser.model'); // Adjust the path as necessary

// Register a new company user
const registerCompanyUser = async (req, res) => {
    const { companyName, category, email, password, address } = req.body;

    try {
        let user = await CompanyUser.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new CompanyUser({
            companyName,
            category,
            email,
            password,
            address
        });
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login a company user
const loginCompanyUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await CompanyUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        console.log(user._id);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Store token in cookie
        res.cookie('userId', user._id, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
            sameSite: 'strict'
        });
        return res.status(200).json({ msg: 'Login successful' });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all company users
const getAllCompanyUsers = async (req, res) => {
    try {
        const users = await CompanyUser.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Filter companies based on categories
const filterCompaniesByCategory = async (req, res) => {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ msg: 'Categories are required and should be an array' });
    }

    try {
        const companies = await CompanyUser.find({ category: { $in: categories } });
        res.json(companies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerCompanyUser,
    loginCompanyUser,
    getAllCompanyUsers,
    filterCompaniesByCategory
};