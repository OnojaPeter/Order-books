
async function signupPage (req, res) {
    try {
        res.render("signup");
    } catch(err) {
        console.error(err);
    }
}

module.exports = signupPage;