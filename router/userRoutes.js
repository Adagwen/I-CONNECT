const express = require("express");
const router = express.Router();
const { signup,
        login,
        currentUser,
        getUsers,
        getUser,
        //getUserById,
        updateUser,
       deleteUser } = require('../controllers/userControllers');


const validateToken = require("../middleware/validateToken");

router.post("/signup", signup);
router.post("/login", login);
router.get("/allUsers",  getUsers);
router.get("/:id",  getUser);
router.get("/currentUser", validateToken, currentUser);

router.put("/update/:id",  updateUser);
router.delete("/delete/:id",  deleteUser);



module.exports = router;


