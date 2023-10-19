const Customer = require ("../models/customers.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const tokenKey = process.env.TOKEN_KEY;

async function signupPost(req, res) {

    try{
        const { name, email, password } = req.body;
        if (!(email && password && name)) {
            res.status(400).send("All input fields are required")
        }
        // Perform validation
        const oldCustomer = await Customer.findOne({ email });
        if(oldCustomer){
            return res.status(409).send("User Already Exist. Login instead")
        }
        //hashedPassword
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        console.log(password)

        const customer = new Customer ({
            name,  
            email: email.toLowerCase(), 
            password: hashedPassword, // Hashed and salted password
        });

        console.log(customer);
        await customer.save();
    
        //jwt
        const token = jwt.sign(
            { customer_id: customer._id, email },
            tokenKey,
            {
                expiresIn: "2h"
            }
        );
        console.log(token)
        customer.token = token;
    
        // res.redirect(`/${customer.id}`)


        res.redirect("/");

        // res.status(200).send('User registered successfully.');
    } catch(err) {
        console.error(err);
        res.status(500).send('Error registering user.');
    }
}


module.exports = signupPost; 