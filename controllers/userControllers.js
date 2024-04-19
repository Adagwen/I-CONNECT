const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you've modified the model as suggested earlier
const { sendEmailNotification } = require("../notification-email/emailNotifier");

//@desc Register a user (customer or vendor)
//@route POST /api/users/register
//@access public
const signup = asyncHandler(async (req, res) => {
    const { role, first_Name, last_Name, email, phone, username, password, location, imageUrl, bio } = req.body;
    
    if (!role || !first_Name || !last_Name || !email || !phone || !username || !password || !imageUrl || !bio) {
        return res.status(400).json({message: "All fields are mandatory"});
        //throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).json({message: "Invalid Request"});
        // throw new Error("Invalid Request.")
    }

    
    // Making use of bcrypt to hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user (customer or vendor) based on the role
    const user = await User.create({
        role,
        first_Name,
        last_Name,
        email,
        phone,
        username,
        password: hashedPassword,
        location: role === 'vendor' ? location : undefined, // Location required only for vendors
        imageUrl,//rq.body.imageUrl,
        bio //req.body.bio
    });

    console.log("user", user)

    const details = {
        from: '"Ada" <AdaobiEzeokafor@womentechsters.org>',
        to: email,
        subject: "Verify Email Address",
        html: `<p>Hello ${first_Name}</p>`,
    };
    await sendEmailNotification(details);

    console.log(`User created successfully ${user}`);
    if (user) {
        return res.status(200).json({ _id: user._id, email: user.email, message: `${role} created successfully` });
    } else {
        return res.status(400).json({message: `${role} data is not valid` });
        
    }
});

//@desc Login user (customer or vendor)
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            // Payload embedded in the token
            user: {
                username: user.username,
                email: user.email,
                id: user._id,
                role: user.role
            },
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        });

        res.status(200).json({ _id: user._id, email: user.email, accessToken, message: `${user.role} logged in successfully` });
    } else {
        res.status(401)
        throw new Error("Email or password is not valid");
    }
});

//@desc Get current user info
//@route POST /api/users/me
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user); // This should give you the user info
});


//@desc Get all users (customers or vendors)
//@route Get /api/users
//@access private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find(); 
    res.status(200).json(users);
});



const getUser = asyncHandler(async(req,res) => {
    console.log("i got here")
    const user = await User.findById(req.params.id);//use findById to get an individual contact
    console.log("usr", user)
     if(!user){
        res.status(404);
        throw new Error("User not found");
     }
     // Include availability if applicable
 const availability = user.role === 'vendor' ? user.availability : null;

 return res.status(200).json({ ...user._doc, ...(availability && { availability }) }); 
    //return res.status(200).json(user);
});

// @desc Updateuser (customer or vendor) by ID
// @route PUT /api/users/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {
    
    const { role, first_Name, last_Name, email, phone, username, password, location, imageUrl, bio } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    
    // Update user fields
    user.role = role;
    user.first_Name = first_Name;
    user.last_Name = last_Name;
    user.email = email;
    user.phone = phone;
    user.username = username;
    user.location = location;
    user.imageUrl = imageUrl;
    user.bio = bio;

     // Save the updated user
     const updatedUser = await user.save();

    res.status(200).json(updatedUser);
});


//@desc Delete user (customer or vendor) by ID
//@route DELETE /api/users/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({message: "User successfully deleted"});
});


module.exports = {
    signup,
    login,
    currentUser,
    getUsers,
    getUser,
    // getUserById,
    updateUser,
    deleteUser
};

// Additional endpoints for getting, updating, and deleting users can be added here.
