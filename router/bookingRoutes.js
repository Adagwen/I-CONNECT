const express = require("express");
const router = express.Router();
const{createBooking, allBookings} = require("../controllers/bookingController");

router.post("/booked", createBooking);
router.get("/allBooking", allBookings)
//router.post("/register", registerCustomer);

module.exports = router;