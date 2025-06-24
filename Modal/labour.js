const mongoose = require('mongoose');
//name, role, site, email, phone
const LabourSchema = new mongoose.Schema({
   Name : {
    type : String,
    required : true
   },
  Role : {
    type : String,
    required : true
   },
   AssignedSite : {
    type : String,
    required : true
   },
   email: {
    type : String,
    required : true
   },
   PhoneNo : {
    type : Number,
    required : true
   },

}, { collection: 'Labour' }); // Explicitly sets collection name

module.exports = mongoose.model('Labour', LabourSchema);