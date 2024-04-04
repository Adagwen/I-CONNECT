//This defines a vendor data model for listing services with details and optional image uploads.

const mongoose = require("mongoose");

const vendorServiceSchema = new mongoose.Schema ({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "VendorService",
        ref: "Vendor",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pricing: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        optional: true
    },
    //other relevant fields as needed
});

module.exports = mongoose.model("vendorService", vendorServiceSchema);

// This schema defines a Vendor Service model with fields like:

// vendor: Reference to the service provider who created the service (ObjectId referencing the vendor model).
// title: Title of the service.
// description: Detailed description of the service.
// pricing: Price of the service.
// location: Location where the service is offered.
// imageUrl (optional): URL for an image showcasing the service.