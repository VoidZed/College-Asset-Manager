import { AccountCircle, Lock } from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import SrmsLogo from "../assets/srms_logo.png"

function login() {
    return (
        <>
            {/* outer wrapper box */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <Stack flex sx={{
                    width: {
                        xs: '100%',
                        md: '100%',
                        lg: '70%',
                        xl: '70%'
                    },
                    border: '1px solid gray',
                    alignItems: 'center'

                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
                        <Typography variant='h4' color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Shri Ram Murti Smarak College of Engineering & Technology</Typography>
                        <Typography variant='h5' sx={{ bgcolor: "darkred", color: 'white', padding: '2px 7px', borderRadius: '5px' }}>
                            Institute Portal
                        </Typography>
                    </Box>
                    <Box>
                        {/* lower stack for logo and form */}
                        <Stack direction='row' spacing={2}>
                            {/* left box for logo */}
                            <Box flex={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={SrmsLogo}
                                    alt="Logo"
                                    style={{ maxWidth: '80%', height: 'auto' }}
                                />
                            </Box>
                            <Divider
                                sx={{
                                    height: {
                                        sm: '80%',
                                        xs: 'none',
                                    },
                                    borderRight: {
                                        xs: 'none',
                                        sm: '1px solid #d4d0cf',
                                        marginTop: '95px',
                                    },
                                }}
                                orientation={{
                                    xs: 'horizontal',
                                    sm: 'vertical',
                                }}
                            />
                            {/* right  login form */}

                            <Box flex={1} sx={{ padding: '20px' }}>




                                <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Institute Login
                                </Typography>

                                <form >
                                    <Stack spacing={3}>
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            name='username'


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
                                            >
                                                <MenuItem value="student">Student</MenuItem>
                                                <MenuItem value="faculty">Faculty</MenuItem>
                                                <MenuItem value="hod">HOD</MenuItem>
                                                <MenuItem value="dsw">Principla</MenuItem>
                                                <MenuItem value="principal">Principla</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" type='submit' sx={{ width: '100%' }}>
                                            Login
                                        </Button>
                                    </Stack>
                                </form>



                            </Box>
                        </Stack>
                    </Box>
                </Stack>

            </Box>
        </>
    )
}

export default login