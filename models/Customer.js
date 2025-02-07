const mongoose = require('mongoose');

// blueprint
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number
  });
  
// defines the model  
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
