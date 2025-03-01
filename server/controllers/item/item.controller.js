const { log } = require('console');
const CompanyItem = require('../../models/company/item');
const mongoose = require('mongoose');

const companyController = {
    // Get all items for a company
    async getAllItems(req, res) {
        try {
            const {companyId} = req.params;
            console.log(companyId);
            const items = await CompanyItem.find( {companyId: new mongoose.Types.ObjectId(companyId)} )
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                count: items.length,
                data: items
            });

        } catch (error) {
            res.status(500).json({
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
            const companyId = req.params;
            const newItem = new CompanyItem({
                name,
                description,
                price,
                quantity,
                companyId: new mongoose.Types.ObjectId(companyId)
            });

            const savedItem = await newItem.save();

            res.status(201).json({
                success: true,
                data: savedItem
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding new item',
                error: error.message
            });
        }
    },

    // Update item
    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const update = req.body;
            const companyId = req.user._id;

            const item = await CompanyItem.findOneAndUpdate(
                { _id: id, companyId },
                update,
                { new: true }
            );

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Item not found'
                });
            }

            res.status(200).json({
                success: true,
                data: item
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating item',
                error: error.message
            });
        }
    }
};

module.exports = companyController;