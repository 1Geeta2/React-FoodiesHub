const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection (NoSQL)
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB (NoSQL) Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = { connectMongoDB };