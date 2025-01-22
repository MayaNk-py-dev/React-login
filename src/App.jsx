import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Router from './Router';
import { createTheme } from '@mui/material/styles';

// Default light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Default dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Retrieve user's preference from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Memoize the theme to avoid unnecessary re-renders
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize styles to be consistent across themes */}
      <Box
        sx={{
          backgroundColor: isDarkMode ? 'background.default' : 'white',
          minHeight: '100vh', // Ensures the background covers the full height
        }}
      >
        <BrowserRouter>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Router />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}
