    import React, { useState } from 'react';
    import { Box, Stack, IconButton, Button, useMediaQuery } from '@mui/material';
    import { Menu as MenuIcon, Close as CloseIcon, Brightness4, Brightness7 } from '@mui/icons-material';
    import { Link, useNavigate } from 'react-router-dom';

    export default function Navbar({ toggleTheme, isDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Media Query for mobile screens
    const isMobile = useMediaQuery('(max-width:600px)');

    // Navigation hook
    const navigate = useNavigate();

    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove the token
        navigate('/login'); // Redirect to login page
    };

    // Conditionally set NAV_ITEMS based on login status
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
            padding: '8px 16px',
            borderBottom: 1,
            borderColor: 'gray.200',
            backgroundColor: isDarkMode ? 'grey.900' : 'white',
            paddingRight: 48, // Make space for the theme toggle button
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile Menu Button */}
            {isMobile && (
                <IconButton onClick={toggleMenu} aria-label="Toggle Navigation" sx={{ color: isDarkMode ? 'white' : 'black' }}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            )}

            {/* Logo */}
            <Box>
                <Link
                to="/"
                style={{
                    color: isDarkMode ? 'white' : 'black',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
                >
                Logo
                </Link>
            </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
            <Stack direction="row" spacing={4}>
                {NAV_ITEMS.map(
                (navItem) =>
                    navItem.show && (
                    <Box key={navItem.label}>
                        <Button
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
                    </Box>
                    )
                )}
                {/* Conditionally render Logout button if the user is logged in */}
                {authToken && (
                <Box>
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
                </Box>
                )}
            </Stack>
            )}
        </Box>

        {/* Mobile Navigation Menu */}
        {isMobile && isOpen && (
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                backgroundColor: isDarkMode ? 'grey.900' : 'white',
            }}
            >
            {NAV_ITEMS.map(
                (navItem) =>
                navItem.show && (
                    <Button key={navItem.label} component={Link} to={navItem.href} sx={{ padding: 1, color: isDarkMode ? 'white' : 'black' }}>
                    {navItem.label}
                    </Button>
                )
            )}
            {/* Mobile Logout button */}
            {authToken && (
                <Button onClick={handleLogout} sx={{ padding: 1, color: isDarkMode ? 'white' : 'black' }}>
                Logout
                </Button>
            )}
            </Box>
        )}

        {/* Theme toggle button */}
        <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%)', // Center the button vertically
            zIndex: 10, // Make sure it's above other content
            color: isDarkMode ? 'white' : 'black',
            }}
        >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />} {/* Show sun for light, moon for dark */}
        </IconButton>
        </Box>
    );
    }
