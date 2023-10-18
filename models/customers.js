const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    email: String, //hash password

    // Other fields and their types
  });
  
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;