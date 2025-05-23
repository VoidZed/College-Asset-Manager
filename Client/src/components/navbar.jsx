import React, { useState, useEffect, useRef } from 'react'
import { AppBar, IconButton, Stack, Toolbar, Avatar, Box, Typography, Icon, MenuItem, Menu, Badge, Divider, useMediaQuery } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SrmsLogo from "../assets/srms_logo.png"
import { navbarColor } from '../utils/color';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/authSlice'

import MenuIcon from '@mui/icons-material/Menu';


import { useIsMobile } from '../theme/theme';



function toTitleCase(word) {
  //convert the word to title
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function navbar({ toggleDrawer }) {


  const isMobile = useIsMobile();

  const dispatch = useDispatch();

  const { user, role, isLoggedIn } = useSelector((state) => state.auth);

  

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

 
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    try {
      handleClose();
      navigate("/profile")

    } catch (error) {
      console.log(error)
    }
  }

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




  return (
    <AppBar position='relative' sx={{
      boxShadow: "none",
      bgcolor: navbarColor
    }} >
      <Toolbar >
        {/* link to homepage */}
        <Stack direction='row' width='100%' sx={{ justifyContent: "space-between", alignContent: 'center', alignItems: 'center' }}>
          <Box>
            {isMobile && (<IconButton onClick={toggleDrawer(true)}><MenuIcon sx={{ fontSize: '30px' }}></MenuIcon></IconButton>)}

            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
              <IconButton size='small' edge="start" >
                <img src={SrmsLogo} alt="Logo" height={isMobile ? 37 : 47} />
              </IconButton>
            </Link>
          </Box>



          {/* sample flex box to take up the space in between */}
          {/* <Box sx={{ flexGrow: 1 }}></Box> */}










          {isLoggedIn && (

            < Box sx={{ display: 'flex', alignItems: 'center' }}>





              {isMobile ? (<Avatar sx={{ bgcolor: 'rgb(5,84,156)', height: '30px', width: '30px', fontSize: '17px' }}>{firstLetter}</Avatar>) : (<Avatar sx={{ bgcolor: 'rgb(5,84,156)' }}>{firstLetter}</Avatar>)}

              {!isMobile && (<Stack direction='column' ml={1} mr={1} color='black'>
                <Typography variant='body2'>{user}</Typography>
                <Typography variant='body2'>{toTitleCase(role)}</Typography>
              </Stack>
              )}

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
                <MenuItem onClick={handleProfile} sx={{ fontSize: '15px' }}><PersonIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />Profile</MenuItem>
                {/* <MenuItem onClick={handleClose} sx={{ fontSize: '15px' }}><AccountCircleIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />My account</MenuItem> */}
                <MenuItem onClick={handleLogout} sx={{ fontSize: '15px' }}><LogoutIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />Logout</MenuItem>
              </Menu>

            </Box>

          )}





        </Stack>

      </Toolbar>
    </AppBar >
  )
}

export default navbar