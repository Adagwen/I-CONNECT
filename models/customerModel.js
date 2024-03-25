//defines the user model
const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    
     customer_id: {
         type: mongoose.Schema.Types.ObjectId,
        //required: true,
         ref: "Customer",
    },
    name: {
        type: String,
        required: [true, "Please add the customer name"],
    },
    email: {
        type: String,
        required: [true, "Please add the customer email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the customer phone number"],
    },
    username: {
        type: String,
        required: [true, "Please add the customer username"],
    },
    password: {
        type: String,
        required: [true, "Please add the customer password"],
    }
    
    
}, {
    timestamps: true,
});

module.exports = mongoose.model("Customer", customerSchema);