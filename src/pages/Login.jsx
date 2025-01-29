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
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert } from '@mui/material';
import SocialLogin from "../components/SocialLogin";
import KeyIcon from '@mui/icons-material/Key';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users');
            const users = await response.json();
            const user = users.find((user) => user.email === email && user.password === password);
            if (user) {
                // Save the full user object (firstName, lastName, email) in localStorage
                localStorage.setItem('authToken', 'yourAuthToken');
                localStorage.setItem('authUser', JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }));
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Something went wrong. Please try again later.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                <Avatar sx={{ m: 1, bgcolor: 'blue', color:'white' }}>
                    <KeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Jost, sans-serif' }}>
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
                        InputProps={{
                            style: { borderRadius: '12px' },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            style: { borderRadius: '12px' },
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

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '12px' }}>
                        Sign In
                    </Button>

                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                            Successfully logged in...
                        </Alert>
                    )}

                    <Divider sx={{ my: 2 }}>OR</Divider>

                    <SocialLogin />

                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                        <Typography sx={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '14px' }}>Don't have an account?</span>
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{ alignSelf: 'center' , margin: '5px' }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default SignIn;
