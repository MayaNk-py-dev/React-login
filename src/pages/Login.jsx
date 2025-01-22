import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material'; // Add InputAdornment
import Visibility from '@mui/icons-material/Visibility'; // Add Visibility icon
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Add VisibilityOff icon
import { Alert } from '@mui/material';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const [success, setSuccess] = useState(false); // State for success message
    const [showPassword, setShowPassword] = useState(false); // Manage password visibility
    const navigate = useNavigate(); // For navigation after successful login

    // Handle the login form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate inputs
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        // Simulate API call for login
        try {
            const response = await fetch('http://localhost:5000/users'); // Assuming users are stored in the db.json file
            const users = await response.json();

            // Find the user that matches the email and password
            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                // Store a token or any user data for authentication (here we're saving a mock token)
                localStorage.setItem('authToken', 'yourAuthToken'); // Save auth token in localStorage

                // Set success state
                setSuccess(true);

                // Redirect to Home page after successful login
                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Redirect after 2 seconds
            } else {
                setError('Invalid email or password'); // Show error message if credentials don't match
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password input type
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    {/* Show error message if login fails */}
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}

                    {/* Show success message if login is successful */}
                    {success && (
                        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                            Successfully logged in...
                        </Alert>
                    )}

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;
