    import React, { useState } from 'react';
    import { Box, Stack, IconButton, Button, useMediaQuery } from '@mui/material';
    import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
    import { Link } from 'react-router-dom';

    const NAV_ITEMS = [
    { label: 'Home', href: '/Home' },
    { label: 'Login', href: '/' },
    { label: 'Sign Up', href: '/SignUp' },
    ];

    export default function WithSubnavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Media Query for mobile screens
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            borderBottom: 1,
            borderColor: 'gray.200',
            backgroundColor: 'white',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile Menu Button */}
            {isMobile && (
                <IconButton onClick={toggleMenu} aria-label="Toggle Navigation">
                {isOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            )}

            {/* Logo */}
            <Box>
                <Link to="/">Logo</Link>
            </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
            <Stack direction="row" spacing={4}>
                {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Button
                    component={Link}
                    to={navItem.href}
                    sx={{
                        fontSize: 'sm',
                        fontWeight: 500,
                        color: 'gray.600',
                        '&:hover': {
                        textDecoration: 'none',
                        color: 'gray.800',
                        },
                    }}
                    >
                    {navItem.label}
                    </Button>
                </Box>
                ))}
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
                backgroundColor: 'white',
            }}
            >
            {NAV_ITEMS.map((navItem) => (
                <Button
                key={navItem.label}
                component={Link}
                to={navItem.href}
                sx={{ padding: 1 }}
                >
                {navItem.label}
                </Button>
            ))}
            </Box>
        )}
        </Box>
    );
    }
