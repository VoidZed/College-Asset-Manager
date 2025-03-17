// import { AccountCircle, Lock } from '@mui/icons-material';
// import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, useMediaQuery, Snackbar, Alert, CircularProgress } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import SrmsLogo from "../assets/srms.jpg";
// import { useTheme } from '@emotion/react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

// import { useDispatch, useSelector } from 'react-redux';
// //import auth actions
// import { login, logout } from '../store/authSlice'
// import Turnstile from "react-turnstile";



// function Login() {


//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const [token, setToken] = useState(null);


//     const [role, setRole] = useState('');
//     const [loading, setLoading] = useState(false);

//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//     });





//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUser((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formData = {
//             email: user.email.toLowerCase(),
//             password: user.password,
//             turn_token:token,
//             role: role,
//         }
//         console.log(formData);
//         try {

//             const response = await axios.post('/api/auth/login', formData, { withCredentials: true });


//             console.log(response.data.data); // Log the successful response data

//             //chk status before login
//             setAlert({ open: true, message: response.data.message, severity: 'success' });


//             // //update the redux state for login
//             dispatch(login(response.data.data));

//             setAlert({ open: true, message: response.data.message, severity: 'success' });


//             setTimeout(() => {
//                 navigate("/")
//             }, 1000)




//         } catch (error) {
//             console.log(error);

//             setAlert({ open: true, message: error.response?.data?.message || "An error occurred during login.", severity: 'error' });


//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     const handleRoleChange = (event) => {
//         setRole(event.target.value);
//     };

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
//     const handleCloseAlert = (reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setAlert({ ...alert, open: false });
//     };



//     // ✅ Redirect AFTER all hooks are defined
//     useEffect(() => {
//         if (isLoggedIn) {
//             navigate("/");
//         }
//     }, [isLoggedIn, navigate]);

//     // ✅ Render a loading spinner instead of null





//     return (
//         <>
//             {/* outer wrapper box */}
//             <Box sx={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f2f2f2' }}>
//                 <Stack
//                     sx={{
//                         boxSizing: 'border-box',
//                         width:
//                         {
//                             xs: '100%',
//                             md: '70%',
//                             lg: '60%',
//                             xl: '50%'
//                         },
//                         height: 'auto',
//                         alignItems: 'center',
//                         bgcolor: 'white',
//                         padding: '20px'
//                     }}
//                 >
//                     {/*upper box for heading */}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
//                         <Typography variant={isMobile ? 'h5' : 'h4'} color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
//                             Shri Ram Murti Smarak College of Engineering & Technology
//                         </Typography>
//                         <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ bgcolor: "darkred", color: 'white', padding: '2px 7px', borderRadius: '5px', marginTop: '20px' }}>
//                             College Portal
//                         </Typography>
//                     </Box>

//                     {/* lower stack for logo and form */}
//                     <Stack
//                         direction={{ xs: 'column', sm: 'row' }}
//                         spacing={{ xs: 2, sm: 2 }}
//                         sx={{ width: '100%', }}
//                     >

//                         {/* left box for logo */}
//                         <Box
//                             sx={{
//                                 flex: 1,
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 order: { xs: 1, sm: 0 },
//                             }}
//                         >
//                             <img
//                                 src={SrmsLogo}
//                                 alt="Logo"
//                                 style={{ maxWidth: isMobile ? '50%' : '70%', height: 'auto' }}
//                             />
//                         </Box>

//                         <Divider
//                             sx={{
//                                 height: { sm: 'auto', xs: 'none', md: 'auto', lg: 'auto' },
//                                 borderRight: { xs: 'none', sm: '1px solid #d4d0cf' },
//                                 marginTop: { sm: '95px', xs: '0px' },
//                                 width: { xs: '100%', sm: 'auto' },
//                             }}
//                             orientation={{ xs: 'horizontal', sm: 'vertical' }}
//                         />

//                         {/* right login form      */}
//                         <Box flex={1} sx={{ padding: '10px', order: { xs: 2, sm: 1 } }}>
//                             <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'darkred' }}>
//                                 Login
//                             </Typography>

//                             <form onSubmit={handleFormSubmit}>
//                                 <Stack spacing={3}>
//                                     <TextField
//                                         required
//                                         label="Username"
//                                         variant="outlined"
//                                         sx={{ width: '100%' }}
//                                         name='email'
//                                         value={user.email}
//                                         onChange={handleInputChange}
//                                         InputProps={{
//                                             startAdornment: (
//                                                 <InputAdornment position="start">
//                                                     <AccountCircle />
//                                                 </InputAdornment>
//                                             ),
//                                         }}
//                                     />
//                                     <TextField
//                                         required
//                                         label="Password"
//                                         variant="outlined"
//                                         type="password"
//                                         sx={{ width: '100%' }}
//                                         name='password'
//                                         value={user.password}
//                                         onChange={handleInputChange}
//                                         InputProps={{
//                                             startAdornment: (
//                                                 <InputAdornment position="start">
//                                                     <Lock />
//                                                 </InputAdornment>
//                                             ),
//                                         }}
//                                     />
//                                     <FormControl fullWidth required>
//                                         <InputLabel id="role-label">Role</InputLabel>
//                                         <Select
//                                             labelId="role-label"
//                                             id="role-label-select"
//                                             label="Role"
//                                             sx={{ width: '100%' }}
//                                             value={role}
//                                             onChange={handleRoleChange}
//                                         >
//                                             <MenuItem value="student">Student</MenuItem>
//                                             <MenuItem value="faculty">Faculty</MenuItem>
//                                             <MenuItem value="hod">HOD</MenuItem>
//                                             <MenuItem value="dsw">DSW</MenuItem>
//                                             <MenuItem value="principal">Principal</MenuItem>
//                                         </Select>
//                                     </FormControl>

//                                     <Box >
//                                         <Turnstile
//                                             sitekey="0x4AAAAAABAmGr81xgNICd5m" // Replace with your actual site key
//                                             onVerify={(token) => setToken(token)}
//                                         />
                                     
//                                     </Box>



//                                     <Button variant="contained" type='submit' sx={{ width: '100%', height: '45px', bgcolor: 'primary.main' }}>
//                                         {loading ? <CircularProgress size={25} sx={{ color: 'white' }} /> : 'Login'}
//                                     </Button>

//                                 </Stack>
//                             </form>
//                         </Box>
//                     </Stack>
//                 </Stack>
//                 <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
//                     <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
//                     </Alert>
//                 </Snackbar>
//             </Box>
//         </>
//     );
// }

// export default Login;


import { AccountCircle, Lock } from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, useMediaQuery, Snackbar, Alert, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SrmsLogo from "../assets/srms.jpg";
import { useTheme } from '@emotion/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice'
import Turnstile from "react-turnstile";

function Login() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
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
            email: user.email.toLowerCase(),
            password: user.password,
            turn_token: token,
            role: role,
        }
        console.log(formData);
        try {
            const response = await axios.post('/api/auth/login', formData, { withCredentials: true });
            console.log(response.data.data); // Log the successful response data
            setAlert({ open: true, message: response.data.message, severity: 'success' });
            dispatch(login(response.data.data));
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (error) {
            console.log(error);
            setAlert({ open: true, message: error.response?.data?.message || "An error occurred during login.", severity: 'error' });
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
    
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
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
                        <Typography variant={isMobile ? 'h6' : 'h5'} color='darkred' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Shri Ram Murti Smarak College of Engineering & Technology
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
                                style={{ maxWidth: isMobile ? '40%' : '60%', height: 'auto' }}
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
                                Login
                            </Typography>

                            <form onSubmit={handleFormSubmit}>
                                <Stack spacing={2}>
                                    <TextField
                                        required
                                        type='Email'
                                        label="Email"
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
                                        required
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
                                    <FormControl fullWidth required size="small">
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
                                            <MenuItem value="student">Student</MenuItem>
                                            <MenuItem value="faculty">Faculty</MenuItem>
                                            <MenuItem value="hod">HOD</MenuItem>
                                            <MenuItem value="dsw">DSW</MenuItem>
                                            <MenuItem value="principal">Principal</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Turnstile
                                            sitekey="0x4AAAAAABAmGr81xgNICd5m"
                                            onVerify={(token) => setToken(token)}
                                        />
                                    </Box>
                                    <Button variant="contained" type='submit' sx={{ width: '100%', height: '40px', bgcolor: 'primary.main' }}>
                                        {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Login'}
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

export default Login;