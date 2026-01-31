const Feedback = require('../models/feedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { subject, message, rating } = req.body;
    
    const feedback = await Feedback.create({
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      subject,
      message,
      rating
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Feedback submitted successfully! 🎉',
      data: feedback 
    });
  } catch (err) {
    console.error('❌ Feedback error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user's feedback
exports.getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all feedback (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};