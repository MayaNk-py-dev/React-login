import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Router from './Router';
import { createTheme } from '@mui/material/styles';

// Include the Google Fonts link directly in App.jsx
const jostFontLink = document.createElement('link');
jostFontLink.rel = 'stylesheet';
jostFontLink.href = 'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap';
document.head.appendChild(jostFontLink);

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
  typography: {
    fontFamily: 'Jost, sans-serif', // Apply Jost font globally
  },
  
});

// Default dark theme with gradient background
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
  background: {
    default: 'linear-gradient(to right, #434343, #000000)', // Dark gradient background
  },
  typography: {
    fontFamily: 'Jost, sans-serif', // Apply Jost font globally
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
      <CssBaseline />
      {/* Apply background gradient for dark mode */}
      <Box
        sx={{
          minHeight: '100vh',
          background: isDarkMode
            ? 'radial-gradient(at 50% 50%, #002952, #090b11)'
            : 'radial-gradient(at 50% 50%,rgb(255, 255, 255),rgb(255, 255, 255))',
          padding: { xs: '10px', sm: '20px', md: '30px' }, // Adjust padding based on screen size
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
