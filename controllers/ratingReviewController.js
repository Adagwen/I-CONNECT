const asyncHandler = require("express-async-handler");
const Review = require('../models/rating-review');


// Create a new review
const createReview = asyncHandler(async (req, res) => {
  const { customer_Id, vendor_Id, rating, reviewText } = req.body;
  const newReview = new Review({
    customer_Id,
    vendor_Id,
    rating,
    reviewText
  });
  const savedReview = await newReview.save();
  res.json(savedReview);
});

// Get all reviews for a specific vendor
const getAllReviewsForVendor = asyncHandler(async (req, res) => {
  const { vendor_Id } = req.params;
  const reviews = await Review.find({ vendor_Id }).populate('customer_Id');
  res.json(reviews);
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const updatedFields = req.body;
  const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedFields, { new: true });
  res.json(updatedReview);
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  res.json({ message: 'Review deleted successfully' });
});

module.exports = {
  createReview,
  getAllReviewsForVendor,
  updateReview,
  deleteReview
};
