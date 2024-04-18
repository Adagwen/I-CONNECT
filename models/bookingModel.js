const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
   bookingId:{
    type: String,
        required: true
   }, 
  customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', // Reference to Customer model
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor', // Reference to Vendor model
      required: true,
    },
    vendorServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VendorService', // Reference to VendorService model
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Completed', 'cancelled', 'Pending', 'In-Progress'],
      default: 'booked',
    },
  }, {
    timestamps: true,
});
  

module.exports = mongoose.model('Booking', bookingSchema);



// //This code defines four Mongoose schemas:

// User: Stores user information like name and email (ensured to be unique). You can add additional user-related fields as needed.
// ServiceProvider: Stores details about service providers, including their name, services offered (linked to the Service model using an array of ObjectIds), and their availability status.
// Service: Stores information about the services offered, including the service name and description. You can add additional service-related fields like category or price.
// Appointment: Stores appointment details, including the user who booked it (linked to the User model), the service provider (linked to the ServiceProvider model), the specific service chosen (linked to the Service model), date, time, and the appointment status (booked or cancelled).
// These models establish relationships between them using references. This allows you to easily retrieve related data when querying the database. For example, you can get all appointments for a specific user by querying the Appointment model and populating the userId reference to retrieve the full user details.

