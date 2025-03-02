const CompanyItem = require('../../models/company/item');
const mongoose = require('mongoose');
const item = require('../../models/company/item');

const companyController = {
    // Get all items for a company
    async getAllItems(req, res) {
        try {
            const companyId  = req.params;

            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid company ID format'
                });
            }

            const items = await CompanyItem.find({ 
                companyId: new mongoose.Types.ObjectId(companyId) 
            }).sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: items.length,
                data: items
            });

        } catch (error) {
            console.error('Get items error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching company items',
                error: error.message
            });
        }
    },

    // Add new item
    async addItem(req, res) {
        try {
            const { name, description, price, quantity, expiry_date, shelf_life } = req.body;
            const companyId  = req.params; // Correctly destructure companyId
            console.log(companyId)
            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid company ID format'
                });
            }

            const newItem = new CompanyItem({
                name,
                description,
                price,
                quantity,
                expiry_date,
                shelf_life,
                companyId: new mongoose.Types.ObjectId(companyId)
            });

            const savedItem = await newItem.save();

            return res.status(201).json({
                success: true,
                data: savedItem
            });

        } catch (error) {
            console.error('Add item error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error adding new item',
                error: error.message
            });
        }
    },

    // Delete an item by ID
    async deleteItem(req, res) {
        try {
            const { id: itemId } = req.params; // Correctly extract itemId from req.params

            // Debug: Log the itemId to verify it's being extracted correctly
            console.log('Received itemId:', itemId);

            // Validate item ID
            if (!mongoose.Types.ObjectId.isValid(itemId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid item ID format',
                });
            }

            // Find and delete the item
            const deletedItem = await CompanyItem.findByIdAndDelete(itemId);

            // Check if the item was found and deleted
            if (!deletedItem) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found',
                });
            }

            // Return success response
            return res.status(200).json({
                success: true,
                message: 'Item deleted successfully',
                data: deletedItem,
            });
        } catch (error) {
            console.error('Delete item error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting item',
                error: error.message,
            });
        }
    },
    async getItemsInfo (req, res) {
        try {
            const items = await CompanyItem.find({})
                .select('_id expiry_date shelf_life name')
                .lean();
    
            return res.status(200).json({
                success: true,
                count: items.length,
                data: items
            });
    
        } catch (error) {
            console.error('Get items info error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error fetching items information',
                error: error.message
            });
        }
    },
};

module.exports = companyController;