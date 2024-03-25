const express = require("express");
const router = express.Router();
const{createBooking} = require("../controllers/bookingController");

router.post("/booked", createBooking);
//router.post("/register", registerCustomer);

module.exports = router;