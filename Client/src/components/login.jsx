import { AccountCircle, Lock } from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, useMediaQuery, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import SrmsLogo from "../assets/srms_logo.png";
import { useTheme } from '@emotion/react';
import { primary } from "./color"






function Login() {
    const [role, setRole] = useState('');

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
        const formData = {
            username: user.username,
            password: user.password,
            role: role,
        }
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            console.log(response);
            setAlert({ open: true, message: 'Login successful!', severity: 'success' });
        } catch (error) {
            console.log(error);
            setAlert({ open: true, message: 'Login failed. Please check your credentials.', severity: 'error' });
        }
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    // theme hook
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };
    return (
        <>
            {/* outer wrapper box */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Stack
                    sx={{
                        width:
                        {
                            xs: '100%',
                            md: '100%',
                            lg: '70%',
                            xl: '70%'
                        },
                        border: '1px solid gray',
                        alignItems: 'center',

                    }}

                    pt={{ md: 6, sm: 2, xs: 2 }}
                    pb={{ md: 6, sm: 2, xs: 2 }}
                >
                    {/*upper box for heading */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
                        <Typography variant={isMobile ? 'h5' : 'h4'} color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Shri Ram Murti Smarak College of Engineering & Technology
                        </Typography>
                        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ bgcolor: "darkred", color: 'white', padding: '2px 7px', borderRadius: '5px' }}>
                            Institute Portal
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
                                style={{ maxWidth: isMobile ? '60%' : '80%', height: 'auto' }}
                            />
                        </Box>

                        <Divider
                            sx={{
                                height: { xs: 'auto', sm: '400px' }, // Adjust the height for larger screens
                                borderRight: { xs: 'none', sm: '1px solid #d4d0cf' },
                                width: { xs: '100%', sm: 'auto' },
                                alignSelf: 'center' // Ensures it's centered properly in the flex container
                            }}
                            orientation={{ xs: 'horizontal', sm: 'vertical' }}
                        />

                        {/* right login form      */}
                        <Box flex={1} sx={{ padding:'20px', order: { xs: 2, sm: 1 }}}>
                          
                            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Institute Login
                            </Typography>

                            <form onSubmit={handleFormSubmit}>
                                <Stack spacing={3}>
                                    <TextField
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
                                    <FormControl fullWidth>
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
                                    <Button variant="contained" type='submit' sx={{ width: '100%', fontWeight: 'bold' }} size='large'>
                                        Login
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </Stack>
                <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Login;