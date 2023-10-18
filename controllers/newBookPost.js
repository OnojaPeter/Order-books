const Book = require ("../models/books");

async function newBookPost (req, res){
    try{
        const bookTitle = req.body.title;
        const authorName = req.body.author;
        const bookPrice = req.body.price;

        const book = new Book({
            title: bookTitle,
            author: authorName,
            price: bookPrice,
        });
        book.save();
        console.log("Title:" + bookTitle, "Author:" + authorName, "Price:" + bookPrice);
        res.redirect("/");
    } catch(err) {
        console.error(err);
    }
}

module.exports = newBookPost; 