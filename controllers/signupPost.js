const Customer = require ("../models/customers.js");

async function signupPost(req, res) {

    try{
        const { name, email, password } = req.body;

         // Perform validation and password hashing here

        const customer = new Customer ({
            name,  
            email, 
            password, // Hashed and salted password
        });

        console.log(customer);
        await customer.save();
        res.redirect("/login");

        // res.status(200).send('User registered successfully.');
    } catch(err) {
        console.error(err);
        res.status(500).send('Error registering user.');
    }
}


module.exports = signupPost; 