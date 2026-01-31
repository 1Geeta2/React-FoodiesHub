const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getUserFeedback,
  getAllFeedback
} = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/auth');

// User routes (protected - requires login)
router.post('/', protect, createFeedback);
router.get('/my', protect, getUserFeedback);

// Admin route
router.get('/all', protect, admin, getAllFeedback);

module.exports = router;