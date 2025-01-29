    import React, { useState, useEffect } from "react";
    import { Box, Grid, Typography, Card, CardContent, CardActions, Button, useTheme } from "@mui/material";
    import { useNavigate } from "react-router-dom";
    import { HiOutlineUser, HiOutlineChartBar, HiOutlineCog } from "react-icons/hi"; // Icon import

    function Home() {
    const [user, setUser] = useState(null); // To store logged-in user data
    const navigate = useNavigate();
    const theme = useTheme(); // Access current theme (dark or light mode)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authUser");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser)); // Parse and set the user info
        }
    }, []);

    const handleLogout = () => {
        // Clear authentication token and user data, then redirect to login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        navigate("/login");
    };

    // Determine styles based on light or dark mode
    const isDarkMode = theme.palette.mode === "dark";

    const cardStyles = {
        height: "100%",
        borderRadius: 5,
        backgroundColor: isDarkMode
        ? "rgba(8, 6, 46, 0.07)" // Glass-like translucent background
        : "#fff", 
        boxShadow: isDarkMode
        ? "0px 4px 15px rgba(0, 0, 0, 0.5)" 
        : "0px 4px 12px rgba(0, 0, 0, 0.2)", 
        transition: "all 0.3s",
        "&:hover": {
        transform: "scale(1.05)",
        boxShadow: isDarkMode
            ? "0px 8px 24px rgba(0, 0, 0, 0.5)" 
            : "0px 8px 24px rgba(0, 0, 0, 0.3)", 
        },
    };

    const buttonStyles = {
        borderRadius: "20px",
        borderWidth: "2.6px", 
        "&:hover": {
        backgroundColor: "#1976d2", 
        color: "#fff", 
        borderColor: " #1976d2", 
        },
    };

    return (
        <Box sx={{ p: 3, paddingTop: "80px" }}>
        {/* Dashboard Header */}
        <Typography
            variant="h4"
            component="h1"
            sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: theme.palette.text.primary,
            }}
        >
            Welcome to Your Dashboard
        </Typography>

        {/* Welcome message */}
        <Typography
    variant="h6"
    sx={{
        mb: 4,
        textAlign: "center",
        color: theme.palette.text.primary,
    }}
>
    Hello, {user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user ? user.email : "User"}, Here's an overview of your account.
</Typography>


        {/* Dashboard Grid Layout */}
        <Grid container spacing={3} justifyContent="center">
            {/* Card 1: Overview */}
            <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: "center" }}>
                <HiOutlineChartBar size={30} color="#1976d2" />
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mt: 2 }}>
                    Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This is your account overview. Check your stats, progress, and more.
                </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" variant="outlined" color="primary" sx={buttonStyles}>
                    View Details
                </Button>
                </CardActions>
            </Card>
            </Grid>

            {/* Card 2: Recent Activity */}
            <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: "center" }}>
                <HiOutlineUser size={30} color="#1976d2" />
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mt: 2 }}>
                    Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    View your most recent actions or updates within the app.
                </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" variant="outlined" color="primary" sx={buttonStyles}>
                    View Activity
                </Button>
                </CardActions>
            </Card>
            </Grid>

            {/* Card 3: Settings */}
            <Grid item xs={12} sm={6} md={4}>
            <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: "center" }}>
                <HiOutlineCog size={30} color="#1976d2" />
                <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mt: 2 }}>
                    Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Customize your preferences and settings.
                </Typography>
                {user ? (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                    Logged in as: <strong>{user.email}</strong>
                    </Typography>
                ) : (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    No user is logged in.
                    </Typography>
                )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" variant="outlined" color="primary" sx={buttonStyles}>
                    Go to Settings
                </Button>
                </CardActions>
            </Card>
            </Grid>
        </Grid>

        {/* Logout Button */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={handleLogout}>
            Log Out
            </Button>
        </Box>
        </Box>
    );
    }

    export default Home;
