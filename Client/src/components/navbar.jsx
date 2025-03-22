import React, { useState, useEffect, useRef } from 'react'
import { AppBar, IconButton, Stack, Toolbar, Avatar, Box, Typography, Icon, MenuItem, Menu, Badge, Divider } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SrmsLogo from "../assets/srms_logo.png"
import { navbarColor } from '../utils/color';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logout } from '../store/authSlice'
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import io from "socket.io-client";
import { addNotification } from '../store/notificationSlice';




function toTitleCase(word) {
  //convert the word to title
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function navbar() {
  const dispatch = useDispatch();

  const { user, role, isLoggedIn } = useSelector((state) => state.auth);

  const notification = useSelector((state) => state.notification.notifications)
  console.log("sdd", notification)

  //first lettter for avatar
  const firstLetter = user?.charAt(0).toUpperCase()
  console.log("Navbar:", user, role, isLoggedIn)

  const navigate = useNavigate();





  //achor element 
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const open = Boolean(anchorEl);
  const openNoti = Boolean(anchorElNoti);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotiClick = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout', {}, { withCredentials: true })

      if (response.status === 200) {
        console.log("Logged out successfully");
        //redirect to login page
        // persistor.purge();

        dispatch(logout());

        navigate('/login')

      }
    } catch (error) {
      console.log("Error:", error);

    }
  }

  useEffect(() => {
    const socket = io.connect('http://localhost:3000');

    socket.on('new_notification', (number) => {
      //on new notification from the server update the state 
      dispatch(addNotification(number));
      console.log(number)

    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <AppBar position='relative' sx={{
      boxShadow: "none",
      bgcolor: navbarColor
    }} >
      <Toolbar >
        {/* link to homepage */}
        <Stack direction='row' width='100%' sx={{ justifyContent: "space-between", alignContent: 'center', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
            <IconButton size='small' edge="start">
              <img src={SrmsLogo} alt="Logo" height={45} />
            </IconButton>
          </Link>



          <Typography variant='h5' color='rgb(5, 84, 156)' sx={{ fontWeight: 'bold' }}>ABC Portal</Typography>
          {/* sample flex box to take up the space in between */}
          {/* <Box sx={{ flexGrow: 1 }}></Box> */}











          {/* right user info */}
          <Box sx={{ display: 'flex' }}>

            {/* <Box mr={5}><IconButton onClick={handleNotiClick}> <Badge badgeContent={notification.length

            } color='primary'><NotificationsIcon /></Badge></IconButton></Box> */}
            {/* menu for notifications */}
            {/* <Menu anchorEl={anchorElNoti}
              open={openNoti}
              onClose={handleCloseNoti}
              PaperProps={{
                sx: {
                  width: "300px", // ✅ Set custom width
                  borderRadius: "10px", // ✅ Add rounded corners
                  backgroundColor: "#f5f5f5", // ✅ Set background color
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", // ✅ Add shadow
                },
              }}


            > */}


            {/* {notification.map((data, index) => (
                <MenuItem key={index}>
                  <Link to={data.link} style={{textDecoration:'none'}}>
 
                  <Box sx={{ width: '100%' }}>
                    <Stack direction='row' justifyContent="space-between">
                      <Typography sx={{ fontSize: '12px' }}>{data.role}</Typography>
                      <Typography sx={{ fontSize: '12px' }}>12th Mar 25</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>  <ControlPointIcon sx={{ color: 'green', fontSize: '20px' }} />  <Typography sx={{ fontSize: '14px' }}>{data.msg}</Typography></Stack>
                  </Box>

                  </Link>

                </MenuItem>


              ))} */}




            {/* </Menu> */}

            <Avatar sx={{ bgcolor: 'rgb(5,84,156)' }}>{firstLetter}</Avatar>
            <Stack direction='column' ml={1} mr={1} color='black'>
              <Typography variant='heading1'>{user}</Typography>
              <Typography variant='heading2'>{toTitleCase(role)}</Typography>
            </Stack>

            {/* on icon click display menu showing logout button  */}
            <IconButton color='black' onClick={handleClick}>
              <ArrowDropDownIcon ></ArrowDropDownIcon>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} sx={{ fontSize: '15px' }}><PersonIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />Profile</MenuItem>
              <MenuItem onClick={handleClose} sx={{ fontSize: '15px' }}><AccountCircleIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />My account</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ fontSize: '15px' }}><LogoutIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />Logout</MenuItem>
            </Menu>

          </Box>

        </Stack>

      </Toolbar>
    </AppBar>
  )
}

export default navbar