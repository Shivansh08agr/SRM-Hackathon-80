const ShopkeeperUser = require('../../models/shopkeeper/shopkeeperuser.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Register a new shopkeeper
const registerShopkeeper = async (req, res) => {
    try {
        const { username, shopName, email, password, address, phoneNumber } = req.body;

        // Check if user already exists
        const existingUser = await ShopkeeperUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new shopkeeper
        const newShopkeeper = new ShopkeeperUser({
            username,
            shopName,
            email,
            password,
            address,
            phoneNumber
        });

        await newShopkeeper.save();

        res.status(201).json({ message: 'Shopkeeper registered successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error registering shopkeeper', error: error.message });
    }
};

// Login shopkeeper
const loginShopkeeper = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await ShopkeeperUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
module.exports = {
    registerShopkeeper,
    loginShopkeeper,
};
