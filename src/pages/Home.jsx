import React, { useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate(); // For navigation

    // Check if the user is logged in when the component is mounted
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // If there is no token, redirect to login page
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove the token from localStorage to log the user out
        localStorage.removeItem('authToken');

        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <Box
            sx={{
                height: '100vh', // Full height of the screen
                display: 'flex', // Use flexbox to center
                flexDirection: 'column', // Stack elements vertically
                justifyContent: 'center', // Center content vertically
                alignItems: 'center', // Center content horizontally
                textAlign: 'center', // Center text inside the box
            }}
        >
            <Typography variant="h4">You are logged in</Typography>
            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
}

export default Home;
