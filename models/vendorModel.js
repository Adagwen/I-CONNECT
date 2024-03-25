//defines the user model
const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
    
     vendor_id: {
         type: mongoose.Schema.Types.ObjectId,
        //required: true,
         ref: "Vendor",
    },
    name: {
        type: String,
        required: [true, "Please add the vendors name"],
    },
    email: {
        type: String,
        required: [true, "Please add the vendors email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the vendor phone number"],
    },
    username: {
        type: String,
        required: [true, "Please add the vendors username"],
    },
    password: {
        type: String,
        required: [true, "Please add the vendors password"],
    }
    
    
}, {
    timestamps: true,
});

module.exports = mongoose.model("Vendor", vendorSchema);