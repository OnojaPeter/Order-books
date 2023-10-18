const Customer = require ("../models/customers.js");

async function loginPost(req, res) {
    try{
      const { email, password} = req.body;
    //   const email = req.body.email;
    //   const password = req.body.password;    
      // check if the credentials is valid
      await Customer.find({});

      if (Customer) {
        res.redirect("/");
        // console.log(email);
      } else {
        res.status(500).send('Error occured logging user.');
      }
    } catch(err) {
        console.error(err);
    }
}

module.exports = loginPost;