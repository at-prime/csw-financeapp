import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import StockPriceBar from './components/StockPriceBar';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <StockPriceBar />
      </Box>
    </ThemeProvider>
  );
}

export default App; 