const Food = require('../models/Food');
const Order = require('../models/Order'); // ← Must match your actual filename


// ✅ Criteria 5: Search and Sorting
exports.searchFood = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sort } = req.query;
    
    let searchQuery = {};
    
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    if (category) {
      searchQuery.category = category;
    }
    
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }
    
    let sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    else if (sort === 'price_desc') sortOptions.price = -1;
    else if (sort === 'rating') sortOptions.rating = -1;
    else if (sort === 'name') sortOptions.name = 1;
    else sortOptions.createdAt = -1;
    
    const foods = await Food.find(searchQuery).sort(sortOptions);
    
    res.json({ success: true, count: foods.length, data: foods });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json({ success: true, data: foods });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single food
exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('reviews.user', 'name');
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    res.json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create food (admin only)
exports.createFood = async (req, res) => {
  try {
    const foodData = req.body;
    
    if (req.file) {
      foodData.image = `/uploads/${req.file.filename}`;
    }
    
    const food = await Food.create(foodData);
    res.status(201).json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update food (admin only)
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    
    res.json({ success: true, data: food });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete food (admin only)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    
    res.json({ success: true, message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ CREATE ORDER - MONGODB
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, deliveryAddress, notes } = req.body;
    
    // Generate unique transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      deliveryAddress,
      notes,
      transactionId
    });
    
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error('❌ Order creation error:', err); // Debug log
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET USER ORDERS - MONGODB
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL ORDERS - MONGODB (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};