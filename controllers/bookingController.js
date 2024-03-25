const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Booking = require("../models/bookingModel");

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
  //creating a new vendor
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

// //@desc Login customer
// //@route POST /api booking/customers/login
// //@access public
// const loginVendor = asyncHandler(async(req,res)=>{
//     const { email, password } = req.body;
//     if (!email || !password) {
//         res.status(400);
//         throw new Error("All fields are mandatory.");
//     }
//     const vendor = await Vendor.findOne({email});
//     //compare password with hashedpassword
//     if(vendor && (await bcrypt.compare(password, vendor.password))) {
//         const accessToken = jwt.sign({
//     //this is the payload we are going to embed in our token
//             vendor: {
//                 username: vendor.username,
//                 email: vendor.email,
//                 id: vendor.id
//             },
//         }, process.env.ACCESS_TOKEN_SECRET,
//         {expiresIn: "15m"}
//         );
//         res.status(200).json({accessToken});
//     }else {
//         res.status(401)
//         throw new Error("email or password is not valid");
//     }

// });

// //@desc current user info
// //@route POST /api/users/register
// //@access private
// const currentVendor = asyncHandler(async(req,res)=>{
//     res.json(req.customer);// this should give you the user info
// });

module.exports = { createBooking };
