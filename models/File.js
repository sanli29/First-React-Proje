const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    extention: {
        type: String, // dosya uzantısı,
        required: true
    },
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sale',
        required: true
    }],
    columns: {
        type: Object,
        //required: true
    },
    type: {
        type: String
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

FileSchema.pre('update', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = File = mongoose.model('file', FileSchema);
