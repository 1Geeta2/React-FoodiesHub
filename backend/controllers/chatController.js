const Chat = require('../models/Chat');

// ✅ Criteria 9: Real-Time Chat Controller
exports.getChatHistory = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await Chat.find({ room })
      .sort({ timestamp: 1 })
      .limit(100)
      .populate('sender', 'name');
    
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveMessage = async (messageData) => {
  try {
    const chat = await Chat.create(messageData);
    return chat;
  } catch (err) {
    console.error('Error saving message:', err);
    return null;
  }
};