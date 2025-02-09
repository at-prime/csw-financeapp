const express = require('express');
const router = express.Router();
const Stock = require('../models/stock.model');

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get stock by symbol
router.get('/:symbol', async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 