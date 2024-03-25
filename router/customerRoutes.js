//define customer-related routes
 
const express = require("express");
const router = express.Router();
const{
    getCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");
const{
    registerCustomer,
    loginCustomer,
    currentCustomer
}=require("../controllers/customerAuth");
const validateToken = require("../middleware/validateToken");

//const{createCustomer} = require("../controllers/customerAuth")

//const validateToken = require("../middleware/validateTokenHandler");

//router.use(validateToken);//use this for all the route
router.route("/").get(getCustomers);
router.route( "/:id").get(getCustomer);
router.route( "/:id").put(updateCustomer);
router.route( "/:id").delete(deleteCustomer);
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/current", validateToken, currentCustomer);



module.exports = router;
