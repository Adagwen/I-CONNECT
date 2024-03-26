const mongoose = require("mongoose");

const ratingReviewSchema = new mongoose.Schema({
    customer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required: true,
    },
    vendor_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', 
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('ratingReview', ratingReviewSchema);
