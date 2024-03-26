const express = require("express");
const router = express.Router();
const{
    createReview,
    getAllReviewsForVendor,
    updateReview,
    deleteReview
} = require("../controllers/ratingReviewController");

router.post("/review", createReview);
router.get("/:id", getAllReviewsForVendor);
router.put("/:id", updateReview);
router.post("/:id", deleteReview);


module.exports = router;