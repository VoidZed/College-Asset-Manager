import React, { useState } from 'react'
import { AppBar, IconButton, Stack, Toolbar, Avatar, Box, Typography, Icon, MenuItem, Menu } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SrmsLogo from "../assets/srms_logo.png"
import { navbarColor } from '../utils/color';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
function navbar() {

  //achor element 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position='relative' sx={{
      boxShadow: "none",
      bgcolor: navbarColor
    }} >
      <Toolbar >
        {/* link to homepage */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
          <IconButton size='small' edge="start">
            <img src={SrmsLogo} alt="Logo" height={45} />
          </IconButton>
        </Link>
        <Stack direction='row' width='100%'>

          {/* sample flex box to take up the space in between */}
          <Box sx={{ flexGrow: 1 }}></Box>

          {/* right user info */}
          <Box sx={{ display: 'flex' }}>

            <Avatar sx={{bgcolor:'rgb(5,84,156)'}}>A</Avatar>
            <Stack direction='column' ml={1} mr={1} color='black'>
              <Typography variant='heading1'>Amit Verma</Typography>
              <Typography variant='heading2'>Student</Typography>
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
              <MenuItem onClick={handleClose} sx={{ fontSize: '15px' }}><LogoutIcon sx={{ fontSize: '19px', color: "#4a4a49", marginRight: "10px" }} />Logout</MenuItem>
            </Menu>

          </Box>

        </Stack>

      </Toolbar>
    </AppBar>
  )
}

export default navbar