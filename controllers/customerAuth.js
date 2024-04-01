const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const {sendEmailNotification} = require("../notification-email/emailNotifier")

//@desc Register a customer
//@route POST /api/customers/register
//@access public
const registerCustomer = asyncHandler(async(req,res)=>{
    const {name,email,phone,username, password} = req.body;
    if (!name || !email || !phone || !username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const customerAvailable = await Customer.findOne({email});
    if (customerAvailable) {
        res.status(400);
        throw new Error("Invalid Request.")
    }

    //making use of bcrypt... Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    //creating a new user
    const customer = await Customer.create({
        name,
        email,
        phone,
        username,
        password: hashedPassword
    });

    const details = {
        from: '"Ada" <AdaobiEzeokafor@womentechsters.org>', // sender address
      to: email, // recipient address
      subject: "verify email address",
      html: `<p>Hello ${name}</p>`,
    }
    await sendEmailNotification(details);

    console.log(`Customer created successfully ${customer}`);
    if (customer) {
        res.status(201).json({_id: customer.id, email: customer.email, message: "Customer created successfully" });
    } else {
        res.status(400);
        throw new Error("Customer data is not valid");
    }
    res.json({message: "Registration completed."});
});

//@desc Login customer
//@route POST /api/customers/login
//@access public
const loginCustomer = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const customer = await Customer.findOne({email});
    //compare password with hashedpassword
    if(customer && (await bcrypt.compare(password, customer.password))) {
        const accessToken = jwt.sign({
    //this is the payload we are going to embed in our token
            customer: {
                username: customer.username,
                email: customer.email,
                id: customer.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else {
        res.status(401)
        throw new Error("email or password is not valid");
    }

});

//@desc current user info
//@route POST /api/users/register
//@access private
const currentCustomer = asyncHandler(async(req,res)=>{
    res.json(req.customer);// this should give you the user info
});




module.exports = {registerCustomer, loginCustomer, currentCustomer};