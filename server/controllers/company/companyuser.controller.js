const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CompanyUser = require('../../models/CompanyUser'); // Adjust the path as necessary

// Register a new company user
export const registerCompanyUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await CompanyUser.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new CompanyUser({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
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
export const loginCompanyUser = async (req, res) => {
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

// Get all company users
export const getAllCompanyUsers = async (req, res) => {
    try {
        const users = await CompanyUser.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Filter companies based on categories
export const filterCompaniesByCategory = async (req, res) => {
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

