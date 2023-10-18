const Book = require ("./books");

async function homePage(req, res) {
    try{
        const books = await Book.find({});
        res.render("index", {
            books: books
        });  
    } catch(err) {
        console.error(err);
    }
}

module.exports = homePage;