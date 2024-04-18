const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Booking = require("../models/bookingModel");
const {sendEmailNotification} = require("../notification-email/emailNotifier");

//@desc Register a customer
//@route POST /api/customers/register
//@access public
const createBooking = asyncHandler(async (req, res) => {
  const { customerId, vendorId, vendorServiceId, dateTime, status } = req.body;
  console.log({ customerId, vendorId, vendorServiceId, dateTime, status });
  if (!customerId || !vendorId || !vendorServiceId || !dateTime || !status) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // const bookingExist = await Booking.findOne({bookingId});
  // if (bookingExist) {
  //     res.status(400);
  //     throw new Error("Booking already made.")
  // }
  console.log(generateRandomBookingId());
  //creating a new booking
  const bookingData = {
    bookingId: generateRandomBookingId(),
    customerId,
    vendorId,
    vendorServiceId,
    dateTime,
    status: "Pending"
  };
  console.log(bookingData);

  try {
    const newBooking = new Booking(bookingData);

    newBooking.save();

    //send notification email to the vendor
    const vendorEmail = 'jesudunsinadesina@gmail.com';
    const emailDetails = {
      from: '"Your App" <AdaobiEzeokafor@womentechsters.org>',
      to: vendorEmail,
      subject: 'New Booking Notification',
      html: `<p>Hello Dusin</p>` +
              `<p>You have a new booking. Please login to your account to view details</p>`
    } ;
    await sendEmailNotification(emailDetails);

    if (newBooking) {
        //res.status(201).json({bookingId});
        res.status(201).json({ newBooking, message: "Booking completed." });
      } else {
        res.status(400);
        throw new Error("Booking data is not valid");
      }
    return;
  } catch (e) {
    console.log("err", e);
    return
  }
 
});
function generateRandomBookingId() {
  const randomString = Math.random().toString(36).substring(2, 15); // Generate random alphanumeric string
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36
  return `BK-${randomString}-${timestamp}`; // Combine with prefix for clarity
}



// const allBookings = async (serviceId) => {
//   try {
//     // Find all bookings where the vendorServiceId matches the provided serviceId
//     const bookings = await Booking.find({ vendorServiceId: serviceId });

//     return bookings;
//   } catch (error) {
//     // Handle errors
//     console.error('Error fetching bookings:', error);
//     throw new Error('Failed to fetch bookings');
//   }
// };


const allBookings = asyncHandler(async (req, res) => {
  const users = await Booking.find(); 
  res.status(200).json(users);
});

//accept booking 
const acceptBooking = asyncHandler(async (req, res) => {
    
  const { id } = req.params;

   // Log the received ID to confirm
   console.log('Received booking ID:', id);

  const booking = await Booking.findById(id);
  if (!booking) {
      res.status(404);
      throw new Error("booking not found");
  }
  
  // Update user fields
  booking.status = "In-Progress";
  

   // Save the updated user
   const updated = await booking.save();

  res.status(200).json(updated);
});



//complete booking
const completeBooking = asyncHandler(async (req, res) => {
    
  const { id } = req.params;

   console.log('Received booking ID:', id);// Log the received ID to confirm

  const booking = await Booking.findById(id);
  if (!booking) {
      res.status(404);
      throw new Error("booking not found");
  }
  
  booking.status = "Completed"; // Update user fields
   const updated = await booking.save();// Save the updated user

  res.status(200).json(updated);
});

//cancel booking
const cancelBooking = asyncHandler(async (req, res) => {
    
  const { id } = req.params;

   console.log('Received booking ID:', id);// Log the received ID to confirm

  const booking = await Booking.findById(id);
  if (!booking) {
      res.status(404);
      throw new Error("booking not found");
  }
  
  booking.status = "cancelled"; // Update user fields
   const updated = await booking.save();// Save the updated user

  res.status(200).json(updated);
});



module.exports = { createBooking, allBookings, acceptBooking, completeBooking, cancelBooking};
