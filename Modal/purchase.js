const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    ItemName: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
       
    },
    Quantity: {
        type: Number,
        required: true
    },
    Unit: {
        type: Number,
        required: true
    },
    Budget: {
       type: Number,
        required: true
    },
    Vendor: {
       type: String,
        required: true
    },
    Priority: {
        type: String,
        required: true
    }
    ,
    DeliveryDate: {
        type: Date,
        required: true
    },
    AdditionalNotes: {
        type: String,
        
    },

}, { collection: 'Purchase' }); // Explicitly sets collection name

module.exports = mongoose.model('Purchase', purchaseSchema);