const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['vendor', 'customer'],
        required: true
    },
    first_Name: {
        type: String,
        required: [true, "Please add the user's first name"],
    },
    last_Name: {
        type: String,
        required: [true, "Please add the user's last name"],
    },
    // name: {
    //     type: String,
    //     required: [true, "Please add the user's last name"],
    // },
    email: {
        type: String,
        required: [true, "Please add the user's email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the user's phone number"],
    },
    username: {
        type: String,
        required: [true, "Please add the user's username"],
    },
    password: {
        type: String,
        required: [true, "Please add the user's password"],
    },
    location: {
        type: String,
        required: function() {
            return this.role === 'vendor'; // Location required only for vendors
        }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
