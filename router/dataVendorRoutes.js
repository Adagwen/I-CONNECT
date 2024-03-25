const express = require("express");
const router = express.Router();


const {
    newServiceDetails,
    retriveServices,
    retriveService,
    updateService
} = require("../controllers/vendorService");
const validateToken = require("../middleware/validateToken");

//validateToken();

router.route("/", validateToken).get(retriveServices);
router.route("/:vendor_id/register").post(newServiceDetails);
router.route( "/:id").get(retriveService);
router.route( "/:id").put(updateService);
// router.post("/", newServiceDetails )//Route to create a new service
// router.get("/", retriveServices);//Route to get all services
// router.get("/:id", retriveService);//Route to get specific service
// router.put("/:id", updateService);//Route to update a service

module.exports = router ;