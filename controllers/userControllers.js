const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you've modified the model as suggested earlier
const { sendEmailNotification } = require("../notification-email/emailNotifier");

//@desc Register a user (customer or vendor)
//@route POST /api/users/register
//@access public
const signup = asyncHandler(async (req, res) => {
    const { role, name, email, phone, username, password, location } = req.body;
    if (!role || !name || !email || !phone || !username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Invalid Request.")
    }

    // Making use of bcrypt to hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user (customer or vendor) based on the role
    const user = await User.create({
        role,
        name,
        email,
        phone,
        username,
        password: hashedPassword,
        location: role === 'vendor' ? location : undefined // Location required only for vendors
    });

    const details = {
        from: '"Ada" <AdaobiEzeokafor@womentechsters.org>',
        to: email,
        subject: "Verify Email Address",
        html: `<p>Hello ${name}</p>`,
    };
    await sendEmailNotification(details);

    console.log(`User created successfully ${user}`);
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email, message: `${role} created successfully` });
    } else {
        res.status(400);
        throw new Error(`${role} data is not valid`);
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

//@desc Get user (customer or vendor) by ID
//@route GET /api/users/:id
//@access private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

//@desc Update user (customer or vendor) by ID
//@route PUT /api/users/:id
//@access private
// const updateUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//     }

//     if (user.user_id.toString() !== req.user.id) {
//         res.status(403);
//         throw new Error("User does not have permission to update other users");
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     );
//     res.status(200).json(updatedUser);
// });


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update other users");
    }

    // Check if the request includes a password field
    if ('password' in req.body) {
        // If yes, hash the new password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Update the password in the user document
        user.password = hashedPassword;
    } else {
        // If no password field is present, update other profile fields
        for (const key in req.body) {
            if (key !== 'role' && key !== 'password') {
                // Only update fields other than role and password
                user[key] = req.body[key];
            }
        }
    }

    // Save the updated user document
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});


//@desc Delete user (customer or vendor) by ID
//@route DELETE /api/users/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to delete other users");
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(200).json(user);
});


module.exports = {
    signup,
    login,
    currentUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};

// Additional endpoints for getting, updating, and deleting users can be added here.
