const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
require('dotenv').config();

const stockRoutes = require('./routes/stock.routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/screener', stockRoutes);

// WebSocket server for real-time stock updates
const wss = new WebSocket.Server({ port: 5001 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send sample stock data every 2 seconds
  const interval = setInterval(() => {
    const stockData = generateRandomStockData();
    ws.send(JSON.stringify(stockData));
  }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Screener service running on port ${port}`);
});

// Helper function to generate random stock data
function generateRandomStockData() {
  const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
  return stocks.map(symbol => ({
    symbol,
    price: (Math.random() * 1000).toFixed(2),
    change: (Math.random() * 10 - 5).toFixed(2)
  }));
} 