//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// require('dotenv').config();

// const secretKey = process.env.SECRET_KEY;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// console.log(`Secret Key: ${secretKey}`);

//-----------------mongoose start----------------------

mongoose.connect("mongodb://127.0.0.1:27017/bookDB", {
  useNewUrlParser: true,       
  useUnifiedTopology: true    
});

const bookSchema = new mongoose.Schema({
  book: String,
  author: String,
  // Other fields and their types
});

const Book = mongoose.model("Book", bookSchema);

//-----------------mongoose stop----------------------

app.get("/",async function(req, res) {
    try{
        const books = await Book.find({});
        res.render("index", {
            books: books
        });  
    } catch(err) {
        console.error(err);
    }
});

app.post("/newBook", async function (req, res){
    try{
        const bookName = req.body.book;
        const authorName = req.body.author;

        const book = new Book({
            book: bookName,
            author: authorName,
        });
        book.save();
        console.log(req.body.book, req.body.author);
        res.redirect("/");
    } catch(err) {
        console.error(err);
    }
})


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });