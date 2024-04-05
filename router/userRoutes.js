const express = require("express");
const router = express.Router();
const { signup,
        login,
        currentUser,
        getUsers,
        getUserById,
        updateUser,
       deleteUser } = require('../controllers/userControllers');


const validateToken = require("../middleware/validateToken");

router.post("/signup", signup);
router.post("/login", login);
router.get("/currentUser", validateToken, currentUser);
router.get("/allUsers",  getUsers);
router.get("/:id",  getUserById);
router.put("/:id",  updateUser);
router.delete("/:id",  deleteUser);



module.exports = router;