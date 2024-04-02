//define authentication routes
 
const express = require("express");
const router = express.Router();
const{
    getVendor, 
    getVendors,
    updateVendor,
    deleteVendor
} = require("../controllers/vendorController");
const{
    registerVendor,
     loginVendor, 
     currentVendor
}= require("../controllers/vendorAuth")
const validateToken = require("../middleware/validateToken");

//router.use(validateToken);//use this for all the route
router.route("/").get(getVendors);
router.route( "/:id").get(getVendor);
router.route( "/:id").put(updateVendor);
router.route( "/:id").delete(deleteVendor);
router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.get("/current", validateToken, currentVendor);



module.exports = router;
