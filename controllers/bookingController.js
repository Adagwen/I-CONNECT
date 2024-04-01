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
    status,
  };
  console.log(bookingData);

  try {
    const newBooking = new Booking(bookingData);

    newBooking.save();

    //send notification email to the vendor
    const vendorEmail = 'adaanunike@gmail.com';
    const emailDetails = {
      from: '"Your App" <AdaobiEzeokafor@womentechsters.org>',
      to: vendorEmail,
      subject: 'New Booking Notification',
      html: `<p>Hello Vendor</p>`
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



module.exports = { createBooking };
