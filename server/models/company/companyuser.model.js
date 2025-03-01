const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companyUserSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    phoneNumber: {
        type: String
    }
}, {timestamps: true});

// Hash password before saving
companyUserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords
companyUserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const CompanyUser = mongoose.model('CompanyUser', companyUserSchema);

module.exports = CompanyUser;