const mongoose = require('mongoose');

const ModalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim : true
    },
    phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  }

}, { collection: 'Modal' }); // Explicitly sets collection name

module.exports = mongoose.model('Modal', ModalSchema);