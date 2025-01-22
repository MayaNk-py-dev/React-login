import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Stack,
    Button,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signupUser, signupSelector, clearState } from '../store/slices/SignUpSlice';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(signupSelector);

    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            console.error(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            setOpenSnackbar(true);
            setTimeout(() => {
                dispatch(clearState());
                reset();
                navigate('/');
            }, 2000);
        }
    }, [isError, isSuccess, dispatch, errorMessage, navigate, reset]);

    return (
        <Box
            sx={{
                
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                    <Typography variant="h4" align="center">
                        Sign up
                    </Typography>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackbar(false)}
                        message="Sign up successful! Redirecting..."
                        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    />

                    {isError && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {errorMessage || 'An error occurred during sign up. Please try again.'}
                        </Alert>
                    )}

                    <Box
                        sx={{
                            backgroundColor: 'background.paper',
                            boxShadow: 3,
                            borderRadius: 2,
                            padding: 3,
                            width: '100%',
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        {...register('firstname', { required: true })}
                                        required
                                    />
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        {...register('lastname', { required: true })}
                                        required
                                    />
                                </Stack>

                                <TextField
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    {...register('email', {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                    })}
                                    required
                                />

                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('password', { required: true })}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isFetching}
                                    sx={{
                                        height: 45,
                                        borderRadius: '190px',
                                        backgroundColor: '#ff5722',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#e64566',
                                        },
                                    }}
                                >
                                    {isFetching ? 'Signing up...' : 'Sign Up'}
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Signup;
