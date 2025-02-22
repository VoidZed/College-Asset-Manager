import { AccountCircle, Lock} from '@mui/icons-material';
import { Stack, Divider, Typography, TextField, Button, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [role, setRole] =useState('');
  
    const [user,setUser   ]=useState({
        username:"",
        password:"",
    });
  
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setUser((prev)=>({...prev,[name]:value}))
    }
  
    const handleFormSubmit=async (e)=>{
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
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };
  return (
    <Stack 
    sx={{
        display:"flex",
        alignItems:"center"
    }}>
        <Typography variant='h3'>
            Institute Portal
        </Typography>
    <Box
      sx={{
        position: 'absolute',
          width: {
          xs: '95%',
          sm: '80%',
          md: '70%',
          lg: '60%',
        },
        height:'98%',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        justifyContent: 'space-between',
        boxShadow: '1px 1px 10px #d4d0cf',
        borderRadius: '7px',
      }}
    >
      <Stack
        sx={{
          width: {
            xs: '100%',
            sm: '50%',
          },
          display: {xs:'none', sm: 'flex'},
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            width: '100%', 
            transform: {
              sm: 'scale(1.5)',
              md: 'scale(1.4)',
            },
          }}
        >
          <img
            src="src/assets/srms-logo.png"
            alt="Logo"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }} 
          />
        </Box>
      </Stack>
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
      <Stack
        sx={{
          width: {
            xs: '100%',
            sm: '45%',
          },
          padding: {
            xs: '10px',
            sm: '20px',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            maxWidth: {
              xs: '300px',
              sm: '400px',
            },
            width: '100%',
            padding: {
              xs: '10px',
              sm: '20px',
            },
          }}
          spacing={2}
        >
          <Typography variant="h4" sx={{ paddingBottom: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Institute Login
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
          <TextField label="Username" 
          
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

          <TextField label="Password" 
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
          <Box>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role-label-select"
                value={role}
                label="Role"
                onChange={handleRoleChange}
                sx={{ width: '100%' }}
                          >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
                <MenuItem value="hod">HOD</MenuItem>
                <MenuItem value="dsw">Principla</MenuItem>
                <MenuItem value="principal">Principla</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" type='submit' sx={{ width: '100%' }}>
            Login
          </Button>
          </Stack>
          </form>
        </Stack>
      </Stack>
    </Box>
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
    </Stack>
  );
};

export default Login;