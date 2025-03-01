const ShopkeeperUser = require('../../models/shopkeeper/shopkeeperuser.model');
const ShopkeeperInventory = require('../../models/shopkeeper/inventory.model');
const mongoose = require('mongoose');
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

        res.cookie('userId', user._id.toString(), {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side access to the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            maxAge: 3600000 // 1 hour
        });        
        console.log('Cookies:', req.cookies);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Update inventory with multiple items
const updateInventory = async (req, res) => {
    try {
        // Get items array and shopkeeper ID from cookies
        const items = req.body;
        const shopkeeperId = req.cookies?.userId;

        // Validate shopkeeper ID
        if (!shopkeeperId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated. Please login first.'
            });
        }

        // Validate input array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Request body must be a non-empty array'
            });
        }

        // Find or create inventory
        let inventory = await ShopkeeperInventory.findOne({ 
            shopkeeperId: new mongoose.Types.ObjectId(shopkeeperId) 
        });
        
        if (!inventory) {
            inventory = new ShopkeeperInventory({
                shopkeeperId: new mongoose.Types.ObjectId(shopkeeperId),
                items: []
            });
        }

        // Process each item
        for (const item of items) {
            const { itemId, orderQuantity } = item;

            // Skip invalid items
            if (!itemId || !orderQuantity || !mongoose.Types.ObjectId.isValid(itemId)) {
                continue;
            }

            const existingItemIndex = inventory.items.findIndex(
                invItem => invItem.item.toString() === itemId
            );

            if (existingItemIndex > -1) {
                // Update existing item
                inventory.items[existingItemIndex].currentStock += Number(orderQuantity);
            } else {
                // Add new item
                inventory.items.push({
                    item: new mongoose.Types.ObjectId(itemId),
                    currentStock: Number(orderQuantity)
                });
            }
        }

        // Save and populate inventory
        await inventory.save();
        
        const updatedInventory = await ShopkeeperInventory.findById(inventory._id)
            .populate({
                path: 'items.item',
                select: 'name price description'
            })
            .lean();

        return res.status(200).json({
            success: true,
            message: 'Inventory updated successfully',
            data: updatedInventory
        });

    } catch (error) {
        console.error('Update inventory error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating inventory',
            error: error.message
        });
    }
};

module.exports = {
    registerShopkeeper,
    loginShopkeeper,
    updateInventory
};