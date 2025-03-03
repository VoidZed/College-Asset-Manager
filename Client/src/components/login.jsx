import { AccountCircle, Lock } from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, useMediaQuery, Snackbar, Alert, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SrmsLogo from "../assets/srms.jpg";
import { useTheme } from '@emotion/react';
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
//import auth actions
import { login, logout } from '../store/authSlice'




function Login() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    


    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            username: user.username.toLowerCase(),
            password: user.password,
            role: role,
        }
        console.log(formData);
        try {

            const response = await axios.post('/api/auth/login', formData, { withCredentials: true });

            console.log(response.data.data);

            // //update the redux state for login
            dispatch(login(response.data.data));

            setAlert({ open: true, message: response.data.message, severity: 'success' });

            setTimeout(() => {
                navigate("/")
            }, 1000)




        } catch (error) {
            console.log(error);
            setAlert({ open: true, message: error.response?.data?.message, severity: 'error' });
        }
        finally {
            setLoading(false);
        }
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };



     // ✅ Redirect AFTER all hooks are defined
     useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    // ✅ Render a loading spinner instead of null
    if (isLoggedIn) {
        return (
           "Loading.........."
        );
    }
    return (
        <>
            {/* outer wrapper box */}
            <Box sx={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f2f2f2' }}>
                <Stack
                    sx={{
                        boxSizing: 'border-box',
                        width:
                        {
                            xs: '100%',
                            md: '70%',
                            lg: '60%',
                            xl: '50%'
                        },
                        height: 'auto',
                        alignItems: 'center',
                        bgcolor: 'white',
                        padding: '20px'
                    }}
                >
                    {/*upper box for heading */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
                        <Typography variant={isMobile ? 'h5' : 'h4'} color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Shri Ram Murti Smarak College of Engineering & Technology
                        </Typography>
                        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ bgcolor: "darkred", color: 'white', padding: '2px 7px', borderRadius: '5px', marginTop: '20px' }}>
                            College Portal
                        </Typography>
                    </Box>

                    {/* lower stack for logo and form */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 2, sm: 2 }}
                        sx={{ width: '100%', }}
                    >

                        {/* left box for logo */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                order: { xs: 1, sm: 0 },
                            }}
                        >
                            <img
                                src={SrmsLogo}
                                alt="Logo"
                                style={{ maxWidth: isMobile ? '50%' : '70%', height: 'auto' }}
                            />
                        </Box>

                        <Divider
                            sx={{
                                height: { sm: 'auto', xs: 'none', md: 'auto', lg: 'auto' },
                                borderRight: { xs: 'none', sm: '1px solid #d4d0cf' },
                                marginTop: { sm: '95px', xs: '0px' },
                                width: { xs: '100%', sm: 'auto' },
                            }}
                            orientation={{ xs: 'horizontal', sm: 'vertical' }}
                        />

                        {/* right login form      */}
                        <Box flex={1} sx={{ padding: '10px', order: { xs: 2, sm: 1 } }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'darkred' }}>
                                Login
                            </Typography>

                            <form onSubmit={handleFormSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        required
                                        label="Username"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                        name='username'
                                        value={user.username}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        required
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        sx={{ width: '100%' }}
                                        name='password'
                                        value={user.password}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl fullWidth required>
                                        <InputLabel id="role-label">Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="role-label-select"
                                            label="Role"
                                            sx={{ width: '100%' }}
                                            value={role}
                                            onChange={handleRoleChange}
                                        >
                                            <MenuItem value="student">Student</MenuItem>
                                            <MenuItem value="faculty">Faculty</MenuItem>
                                            <MenuItem value="hod">HOD</MenuItem>
                                            <MenuItem value="dsw">DSW</MenuItem>
                                            <MenuItem value="principal">Principal</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Button variant="contained" type='submit' sx={{ width: '100%' }} disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : 'Login'}
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </Stack>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>                    {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Login;