// const mongoose = require("mongoose");

// const serviceProviderSchema = new mongoose.Schema({
//     vendor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Vendor",
//         required: true
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     servicesOffered: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Service', // Reference to Service model
//     }],
//     availability: {
//       type: String,
//       enum: ['Available', 'Away', 'Booked'],
//       default: 'Available',
//     },
//   });

// module.exports = mongoose.model("vendor", serviceProviderSchema);