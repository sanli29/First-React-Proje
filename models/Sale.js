const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
    'PO #': {
        type: String,
        required: false
    },
    'External ID': {
        type: String,
        required: false
    },
    'Title': {
        type: String,
        required: false
    },
    'ASIN': {
        type: String,
        required: false
    },
    'Model #': {
        type: String,
        required: false
    },
    'Freight Term': {
        type: String,
        required: false
    },
    'Qty': {
        type: String,
        required: false
    },
    'Unit Cost': {
        type: String,
        required: false
    },
    'Amount': {
        type: String,
        required: false
    },
    'Shortage quantity': {
        type: String,
        required: false
    },
    'Amount shortage': {
        type: String,
        required: false
    },
    'Last received date': {
        type: String,
        required: false
    },
    'ASIN received': {
        type: String,
        required: false
    },
    'Quantity received': {
        type: String,
        required: false
    },
    'Unit cost': {
        type: String,
        required: false
    },
    'Amount received': {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

SaleSchema.pre('update', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = Sale = mongoose.model('sale', SaleSchema);
