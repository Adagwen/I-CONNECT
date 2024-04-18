const express = require("express");
const router = express.Router();
const{createBooking, allBookings, acceptBooking, completeBooking} = require("../controllers/bookingController");

router.post("/booked", createBooking);
router.get("/allBooking", allBookings)
router.put("/acceptBooking/:id", acceptBooking)
router.put("/completeBooking/:id", completeBooking)
//router.post("/register", registerCustomer);

module.exports = router;