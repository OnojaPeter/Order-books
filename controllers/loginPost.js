const Customer = require ("../models/customers.js");
const bcrypt = require('bcryptjs');

async function loginPost(req, res) {
    try{
      const { email, password} = req.body;   
      // check if the credentials is valid
      const foundCustomer = await Customer.findOne({email});
      // console.log(foundCustomer.password)
      if (!foundCustomer) {
        console.log("wrong email");
        res.status(500).send('You' + "'" + 've entered a wrong email');
      } else {
        // Load hash from your password DB.
        bcrypt.compare(password, foundCustomer.password, function(err, result){
          if (result === true) {
            res.redirect("/");
          } else{
            console.log("not a correct password");
            res.status(500).send('You' + "'" + 've entered a wrong password');
          }
        });       
      }
    } catch(err) {
        console.error(err);
    }
}

module.exports = loginPost;