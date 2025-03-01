const CompanyItem = require('../../models/company/item');
const mongoose = require('mongoose');

const companyController = {
    // Get all items for a company
    async getAllItems(req, res) {
        try {
            const { companyId } = req.params;

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
            const { name, description, price, quantity } = req.body;
            const { companyId } = req.params; // Correctly destructure companyId

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

    // Update item
    async updateItem(req, res) {
        try {
            const { id, companyId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(companyId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
            }

            const update = req.body;
            const item = await CompanyItem.findOneAndUpdate(
                { 
                    _id: new mongoose.Types.ObjectId(id), 
                    companyId: new mongoose.Types.ObjectId(companyId) 
                },
                update,
                { new: true }
            );

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: item
            });

        } catch (error) {
            console.error('Update item error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating item',
                error: error.message
            });
        }
    }
};

module.exports = companyController;