const mongoose = require('mongoose');

const companyItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    expiry_date: {
        type: Date,
        required: true
    },
    shelf_life: {
        type: Number,
        required: true
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyUser',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('CompanyItem', companyItemSchema);