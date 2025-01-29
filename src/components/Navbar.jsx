import React, { useState } from 'react';
import { Box, Stack, IconButton, Button, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ toggleTheme, isDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    const NAV_ITEMS = [
        { label: 'Home', href: '/home', show: !!authToken },
        { label: 'Login', href: '/login', show: !authToken },
        { label: 'Sign Up', href: '/signup', show: !authToken },
    ];

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 8px',
                    borderBottom: `1.5px solid ${isDarkMode ? 'gray' : 'black'}`,
                    backgroundColor: isDarkMode
                        ? 'rgba(3, 5, 40, 0.47)' 
                        : 'rgb(255, 255, 255)', 
                    backdropFilter: 'blur(10px)',
                    width: '100%',
                    paddingRight: 4, 
                    margin: 0, 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton
                            onClick={toggleMenu}
                            aria-label="Toggle Navigation"
                            sx={{ color: isDarkMode ? 'white' : 'black' }}
                        >
                            {isOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    )}

                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={isDarkMode
                                    ? 'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=ffffff'
                                    : 'https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000'}
                            alt="React Logo"
                            style={{
                                width: 26,
                                height: 26,
                                marginRight: '8px',
                            }}
                        />
                        {!isMobile && (
                            <span
                                style={{
                                    color: isDarkMode ? 'white' : 'black',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Jost, sans-serif',
                                }}
                            >
                                React App
                            </span>
                        )}
                    </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                    {/* Navbar Items for Larger Screens */}
                    {!isMobile && (
                        <Stack direction="row" spacing={4} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                            {NAV_ITEMS.map(
                                (navItem) =>
                                    navItem.show && (
                                        <Button
                                            key={navItem.label}
                                            component={Link}
                                            to={navItem.href}
                                            sx={{
                                                fontSize: 'sm',
                                                fontWeight: 500,
                                                color: isDarkMode ? 'gray.300' : 'gray.600',
                                                '&:hover': {
                                                    textDecoration: 'none',
                                                    color: isDarkMode ? 'gray.100' : 'gray.800',
                                                },
                                            }}
                                        >
                                            {navItem.label}
                                        </Button>
                                    )
                            )}
                            {authToken && (
                                <Button
                                    onClick={handleLogout}
                                    sx={{
                                        fontSize: 'sm',
                                        fontWeight: 500,
                                        color: isDarkMode ? 'gray.300' : 'gray.600',
                                        '&:hover': {
                                            textDecoration: 'none',
                                            color: isDarkMode ? 'gray.100' : 'gray.800',
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            )}
                        </Stack>
                    )}

                    {/* Dark/Light Mode Toggle Icon in Navbar */}
                    
                        <IconButton
                            onClick={toggleTheme}
                            color="inherit"
                            sx={{
                                marginLeft: '16px',
                                color: isDarkMode ? 'white' : 'black',
                            }}
                        >
                            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    
                </Box>
            </Box>

            {/* Mobile Navbar Menu */}
            {isMobile && isOpen && (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed', // Use fixed to make sure it's on top of the page
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,  // This ensures it stretches to the bottom of the screen
            backgroundColor: isDarkMode ? 'rgba(3, 8, 43, 0.67)' : 'rgba(231, 229, 229, 0.67)',
            backdropFilter: 'blur(10px)',
            padding: 0,  // Remove any additional padding here
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Drop shadow for styling
            overflowY: 'auto', // Prevent content overflow
            zIndex: 9999,
            maxHeight: '30vh', // Ensure it stays on top
        }}
    >
        {/* Cross button for closing the dropdown */}
        <IconButton
            onClick={toggleMenu}
            sx={{ alignSelf: 'flex-end', color: isDarkMode ? 'white' : 'black' }}
        >
            <CloseIcon />
        </IconButton>

        {/* Navbar items */}
        {NAV_ITEMS.map(
            (navItem) =>
                navItem.show && (
                    <Button
                        key={navItem.label}
                        component={Link}
                        to={navItem.href}
                        sx={{
                            padding: 2,
                            color: isDarkMode ? 'white' : 'black',
                            textAlign: 'center',
                            marginBottom: '8px', // Add space between items
                        }}
                    >
                        {navItem.label}
                    </Button>
                )
        )}
        {authToken && (
            <Button
                onClick={handleLogout}
                sx={{ padding: 2, color: isDarkMode ? 'white' : 'black' }}
            >
                Logout
            </Button>
        )}
    </Box>
)}

</Box>
    );
}
