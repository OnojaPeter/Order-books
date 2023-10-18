

async function loginPage (req, res) {
    try {
        res.render("login");
    } catch(err) {
        console.error(err);
    }
}

module.exports = loginPage;