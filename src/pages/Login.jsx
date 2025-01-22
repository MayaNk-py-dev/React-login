import {
    Box,
    TextField,
    Stack,
    Button,
    Typography,
    Container,
    useTheme,
    CssBaseline
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginSelector, clearState } from '../store/slices/LoginSlice';
import { useEffect } from 'react';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(loginSelector);
    
    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            console.log(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            navigate('/home');
        }
    }, [isError, isSuccess]);

    const theme = useTheme();

    return (
        <>
            <CssBaseline /> {/* This helps normalize styles */}
            <Container component="main" maxWidth="xs" >
                <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                    <Typography variant="h4">Sign in to your account</Typography>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: 3,
                            borderRadius: 2,
                            padding: 3,
                            width: '100%',
                            fontFamily:'seoge'
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    {...register('email', { pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    {...register('password', { required: true })}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="#ff5722"
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
                                    {isFetching ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </>
    );
}

export default Login;