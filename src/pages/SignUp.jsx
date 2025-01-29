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
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { Alert, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { PersonAddAlt } from '@mui/icons-material';

export default function SignUp() {
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();

    const theme = useTheme(); // Get the current theme

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const handleSubmit = async (event) => {
        event.preventDefault();

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

        setError(null);

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
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError('Error during sign-up. Please try again.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'blue', color:'white' }}>
                    <PersonAddAlt />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    Sign Up
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                {success && (
                    <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                        Successfully signed up! Redirecting to Login...
                    </Alert>
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
                                InputProps={{
                                    style: { borderRadius: '12px' }, // Apply border radius to the input field
                                }}
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
                                InputProps={{
                                    style: { borderRadius: '12px' }, // Apply border radius to the input field
                                }}
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
                                InputProps={{
                                    style: { borderRadius: '12px' }, // Apply border radius to the input field
                                }}
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
                                InputProps={{
                                    style: { borderRadius: '12px' }, // Apply border radius to the input field
                                }}
                            />
                        </Grid>
                    </Grid>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '12px' }}
                    >
                        Sign Up
                    </Button>

                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                        <Divider sx={{ width: '45%', marginRight: 2 }} />
                        <Typography variant="body2">OR</Typography>
                        <Divider sx={{ width: '45%', marginLeft: 2 }} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button 
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={24} />}
                            sx={{
                                borderRadius: '12px',
                                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Conditional text color
                            }}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Google" width={24} />}
                            sx={{
                                borderRadius: '12px',
                                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Conditional text color
                            }}
                        >
                            Sign up with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{''}
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{ alignSelf: 'center' , margin: '10px' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
