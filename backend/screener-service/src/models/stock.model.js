const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  companyName: String,
  sector: String,
  marketCap: Number,
  price: Number,
  change: Number,
  pe: Number,
  eps: Number,
  dividend: Number,
  volume: Number,
  high52: Number,
  low52: Number,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', stockSchema); 