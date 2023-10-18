//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
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


//-----------------mongoose stop----------------------

//MIME
app.get("/public/css/style.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public/css/style.css"));
    });
    app.get("/public/css/contact.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public/css/contact.css"));
    });
    app.get("/public/css/signup.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public/css/signup.css"));
    });
    app.get("/public/css/login.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "public/css/login.css"));
    });
    // app.get("/public/js/script.js", (req, res) => {
    // res.setHeader("Content-Type", "application/javascript");
    // res.sendFile(path.join(__dirname, "public/js/script.js"));
    // });
    // app.get("/public/js/signup.js", (req, res) => {
    // res.setHeader("Content-Type", "application/javascript");
    // res.sendFile(path.join(__dirname, "public/js/signup.js"));
    // });
    // app.get("/public/js/login.js", (req, res) => {
    // res.setHeader("Content-Type", "application/javascript");
    // res.sendFile(path.join(__dirname, "public/js/login.js"));
    // });
    app.get("/public/images/:imageName", (req, res) => {
    // Get the image file name from the request parameters
    const imageName = req.params.imageName;
    
    // Determine the correct MIME type based on the file extension
    let contentType;
    if (imageName.endsWith(".png")) {
        contentType = "image/png";
    } else if (imageName.endsWith(".jpg") || imageName.endsWith(".jpeg")) {
        contentType = "image/jpeg";
    } else {
        // You may need to add more MIME types for other image formats
        // For example, for GIF, you can add: else if (imageName.endsWith(".gif")) contentType = "image/gif";
        // Make sure to include the appropriate MIME types for the image formats you're serving
    }
    
    // Set the Content-Type header based on the determined MIME type
    res.setHeader("Content-Type", contentType);
    
    // Serve the image file
    res.sendFile(path.join(__dirname, "public/images", imageName));
    });


// importaion from models
const Book = require ("./models/books");
// const Customer = require ("./models/customers");

//importantation from controllers
const signupPost = require ('./controllers/signupPost');
const loginPost = require ('./controllers/loginPost');


//Methods
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

app.get("/login", async function (req, res) {
    try {
        res.render("login");
    } catch(err) {
        console.error(err);
    }
})

app.get("/signup", async function (req, res) {
    try {
        res.render("signup");
    } catch(err) {
        console.error(err);
    }
})

app.post("/signup", signupPost);

app.post("/login", loginPost);

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