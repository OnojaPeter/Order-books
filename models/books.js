const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book: String,
    author: String,
    // Other fields and their types
  });
  
const Book = mongoose.model("Book", bookSchema);

module.exports = Book