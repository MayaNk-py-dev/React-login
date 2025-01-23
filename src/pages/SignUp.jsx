import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function SignUp() {
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [success, setSuccess] = React.useState(false); // For success alert
    const navigate = useNavigate();

    // State for dark mode
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    // Toggle dark mode (you can implement a theme switcher to toggle this)
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    // Validation regex for email, first name, last name, and password
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const nameRegex = /^[A-Za-z]+$/;  // Only letters allowed for names
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate input fields
        if (!nameRegex.test(firstName)) {
            setError('First name should contain only letters.');
            return;
        }

        if (!nameRegex.test(lastName)) {
            setError('Last name should contain only letters.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long, and contain at least one letter and one number.');
            return;
        }

        setError(null); // Clear any previous errors

        const userData = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('User signed up:', result);
            setSuccess(true); // Set success state to true
            setTimeout(() => {
                navigate('/login'); // Redirect to login after 2 seconds
            }, 2000);
        } catch (error) {
            setError('Error during sign-up. Please try again.');
            console.error('Error during sign-up:', error);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                {/* Show error message if there's an error */}
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                {/* Show success message after successful sign-up */}
                {success && (
                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                        Successfully signed up! Redirecting to Login...                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!!error && !nameRegex.test(firstName)}
                                helperText={error && 'Invalid first name'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={!!error && !nameRegex.test(lastName)}
                                helperText={error && 'Invalid last name'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error && !emailRegex.test(email)}
                                helperText={error && 'Invalid email address'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
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
                                error={!!error && !passwordRegex.test(password)}
                                helperText={error && 'Invalid password (8 characters, 1 letter, 1 number)'}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
