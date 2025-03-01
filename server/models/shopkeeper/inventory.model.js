const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyItem',
        required: true
    },
    currentStock: {
        type: Number,
        required: true,
        default: 0
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyUser'
    }
});

const shopkeeperInventorySchema = new mongoose.Schema({
    shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [inventoryItemSchema]
}, { timestamps: true });

// Method to check low stock items
shopkeeperInventorySchema.methods.getLowStockItems = function() {
    return this.items.filter(item => item.currentStock <= item.minimumStock);
};

const ShopkeeperInventory = mongoose.model('ShopkeeperInventory', shopkeeperInventorySchema);

module.exports = ShopkeeperInventory;