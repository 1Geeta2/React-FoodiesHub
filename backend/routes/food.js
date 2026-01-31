const express = require('express');
const router = express.Router();
const {
  getAllFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
  searchFood,
  createOrder,
  getUserOrders,
  getAllOrders
} = require('../controllers/foodController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../config/multer');

// Food routes
router.get('/search', searchFood);
router.get('/', getAllFoods);
router.get('/:id', getFood);
router.post('/', protect, admin, upload.single('image'), createFood);
router.put('/:id', protect, admin, updateFood);
router.delete('/:id', protect, admin, deleteFood);

// Order routes
router.post('/orders', protect, createOrder);
router.get('/orders/my', protect, getUserOrders);
router.get('/orders/all', protect, admin, getAllOrders);

module.exports = router;