const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/vendorModel");
const {sendEmailNotification} = require("../notification-email/emailNotifier")
// import { sendMail } from "../nodemailer/emailNotifier";


//@desc Register a customer
//@route POST /api/customers/register
//@access public
const registerVendor = asyncHandler(async(req,res)=>{
    const {name,email,phone,username, password} = req.body;
    if (!name || !email || !phone || !username || !password || !location) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const vendorAvailable = await Vendor.findOne({email});
    if (vendorAvailable) {
        res.status(400);
        throw new Error("Invalid Request.")
    }

    //making use of bcrypt... Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    //creating a new vendor
    const vendor = await Vendor.create({
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

    console.log(`Vendor created successfully ${vendor}`);
    if (vendor) {
        res.status(201).json({_id: vendor._id, email: vendor.email, message: "Vendor created successfully"});
    } else {
        res.status(400);
        throw new Error("Vendor data is not valid");
    }
    res.json({message: "Registration completed."});
});

//@desc Login customer
//@route POST /api/customers/login
//@access public
const loginVendor = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const vendor = await Vendor.findOne({email});
    //compare password with hashedpassword
    if(vendor && (await bcrypt.compare(password, vendor.password))) {
        const accessToken = jwt.sign({
    //this is the payload we are going to embed in our token
            vendor: {
                username: vendor.username,
                email: vendor.email,
                id: vendor._id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({_id: vendor._id, email: vendor.email,accessToken, message: "Vendor logged in successfully"});
        // res.status(200).json({accessToken});
    }else {
        res.status(401)
        throw new Error("email or password is not valid");
    }

});

//@desc current user info
//@route POST /api/users/register
//@access private
const currentVendor = asyncHandler(async(req,res)=>{
    res.json(req.customer);// this should give you the user info
});

module.exports = {registerVendor, loginVendor, currentVendor};

// sendMail(options, (info) => {
//     console.log("Email sent successfully");
//     console.log("MESSAGE ID: ", info.messageId);
// });