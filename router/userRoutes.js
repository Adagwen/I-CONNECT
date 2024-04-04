const express = require("express");
const router = express.Router();
const { signup, login, currentUser } = require('../controllers/userControllers');


const validateToken = require("../middleware/validateToken");

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", validateToken, currentUser);



module.exports = router;