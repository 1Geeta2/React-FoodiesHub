const mongoose = require('mongoose');

// ✅ Criteria 9: Real-Time Chat Model
const chatSchema = new mongoose.Schema({
  room: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

chatSchema.index({ room: 1, timestamp: -1 });

module.exports = mongoose.model('Chat', chatSchema);