const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Reference to the Item model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Ensure quantity is at least 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index to ensure unique combination of userId and itemId
cartSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);