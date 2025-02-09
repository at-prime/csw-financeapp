import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/StockPriceBar.css';

const StockPriceBar = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);
    
    ws.onopen = () => {
      console.log('WebSocket Connected');
      setLoading(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStocks(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to price feed');
    };

    return () => {
      ws.close();
    };
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (loading) return <Typography>Loading...</Typography>;
  
  return (
    <Box className="stock-price-bar">
      {stocks.map(stock => (
        <Box key={stock.symbol} className="stock-ticker">
          <Typography 
            component="span" 
            className={`price ${stock.change > 0 ? 'positive' : 'negative'}`}
          >
            {stock.symbol}: ${stock.price}
            <Typography 
              component="span" 
              className="change"
            >
              ({stock.change}%)
            </Typography>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StockPriceBar; 