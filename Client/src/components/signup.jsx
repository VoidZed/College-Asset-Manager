

import { AccountCircle, Lock } from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, useMediaQuery, Snackbar, Alert, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SrmsLogo from "../assets/srms.jpg";
import { useTheme } from '@emotion/react';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from "axios"
import Turnstile from "react-turnstile";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userRole = useSelector((state) => state.auth.role);


    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }))
    }


    const verifyUserSignup = (role) => {

        if (userRole === "principal" || userRole === "admin") {
            return true
        }

        else if (userRole === "hod" || userRole === "dsw") {
            const roles = ["faculty", "student"]

            if (roles.includes(role)) {
                return true;
            }
            else {
                setAlert({ open: true, message: `Only HOD, DSW & above can create account of ${role}`, severity: 'error' });
                return false;
            }
        }
        else if (userRole === "faculty") {
            const roles = ["student"]
            if (roles.includes(role)) {
                return true;
            }
            else {
                setAlert({ open: true, message: `Only faculty & above can create account of ${role}`, severity: 'error' });
                return false;
            }
        }
        else if (userRole === "student") {
            setAlert({ open: true, message: `Student can't create any account!`, severity: 'error' });
            return false;
        }
        else {
            return false;
        }

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            turn_token: token,
            role: role,
        }
        console.log(formData);
        try {
            const verify = verifyUserSignup(formData.role);
            if (verify) {
                const response = await axios.post('/api/auth/signup', formData, { withCredentials: true });
                console.log("Response:", response);
                console.log("Response Message:", response.data.message);
                setAlert({ open: true, message: response.data.message, severity: 'success' });
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // 2000ms (2 seconds) delay
            }

        } catch (error) {
            if (error.response) {
                console.log("Error Message:", error.response.data.message);
                setAlert({ open: true, message: error.response?.data?.message, severity: 'error' });
            }
            else {
                setAlert({ open: true, message: "Network Error", severity: 'error' });
            }
        }
        finally {
            setLoading(false);
        }
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm', 'xs'));

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };



    // check wheteher the user is logged in to register new user

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {/* outer wrapper box */}
            <Box sx={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f2f2f2' }}>
                <Stack
                    sx={{
                        boxSizing: 'border-box',
                        width: {
                            xs: '95%',
                            sm: '85%',
                            md: '65%',
                            lg: '55%',
                            xl: '45%'
                        },
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        alignItems: 'center',
                        bgcolor: 'white',
                        padding: { xs: '10px', sm: '15px' },
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {/*upper box for heading */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: { xs: '5px', sm: '8px' } }}>
                        <Typography variant='h5' color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Shri Ram Murti Smarak College of Engineering & Technology , Bareilly
                        </Typography>
                        <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ bgcolor: "darkred", color: 'white', padding: '2px 7px', borderRadius: '5px', marginTop: '10px' }}>
                            College Portal
                        </Typography>
                    </Box>

                    {/* lower stack for logo and form */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ width: '100%' }}
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
                                style={{ maxWidth: isMobile ? '30%' : '60%', height: 'auto' }}
                            />
                        </Box>

                        <Divider
                            sx={{
                                height: { sm: 'auto', xs: 'none', md: 'auto', lg: 'auto' },
                                borderRight: { xs: 'none', sm: '1px solid #d4d0cf' },
                                marginTop: { sm: '50px', xs: '0px' },
                                width: { xs: '100%', sm: 'auto' },
                            }}
                            orientation={{ xs: 'horizontal', sm: 'vertical' }}
                        />

                        {/* right login form */}
                        <Box flex={1} sx={{ padding: '5px', order: { xs: 2, sm: 1 } }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'darkred' }}>
                                Signup
                            </Typography>

                            <form onSubmit={handleFormSubmit}>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': { color: '#666' },
                                            '& .MuiInputLabel-root': { color: '#888' },
                                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } }
                                        }}
                                        name='fullname'
                                        value={user.fullname}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BadgeIcon sx={{ fontSize: '18px', color: '#999' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        size="small"
                                    />
                                    <TextField
                                        label="Email"
                                        type='email'
                                        variant="outlined"
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': { color: '#666' },
                                            '& .MuiInputLabel-root': { color: '#888' },
                                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } }
                                        }}
                                        name='email'
                                        value={user.email}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle sx={{ fontSize: '18px', color: '#999' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        size="small"
                                    />
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': { color: '#666' },
                                            '& .MuiInputLabel-root': { color: '#888' },
                                            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } }
                                        }}
                                        name='password'
                                        value={user.password}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock sx={{ fontSize: '18px', color: '#999' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        size="small"
                                    />
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="role-label" sx={{ color: '#888' }}>Role</InputLabel>
                                        <Select
                                            labelId="role-label"
                                            id="role-label-select"
                                            label="Role"
                                            sx={{
                                                width: '100%',
                                                color: '#666',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' }
                                            }}
                                            value={role}
                                            onChange={handleRoleChange}
                                        >
                                            {/* <MenuItem value="student">Student</MenuItem> */}
                                            <MenuItem value="faculty">Faculty</MenuItem>
                                            <MenuItem value="hod">HOD</MenuItem>
                                            <MenuItem value="dsw">DSW</MenuItem>
                                            <MenuItem value="principal">Principal</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Turnstile
                                            sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                                            onVerify={(token) => setToken(token)}
                                        />
                                    </Box>
                                    <Button variant="contained" type='submit' sx={{ width: '100%', height: '40px', bgcolor: 'primary.main' }}>
                                        {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'SignUp'}
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </Stack>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Signup;