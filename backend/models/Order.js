const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    id: Number,
    name: String,
    price: Number,
    qty: Number,
    image: String
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { 
    type: String, 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  deliveryAddress: { 
    type: String, 
    required: true 
  },
  transactionId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  notes: String
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);