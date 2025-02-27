import { Typography, Box, Divider, Stack, Button, Paper } from '@mui/material'
import React, { useState } from 'react'
import AddHomeIcon from '@mui/icons-material/AddHome';
import { sidebarBgcolor } from '../utils/color';
import { sidebarFontSize } from '../utils/dimension';
import { Link, useLocation } from 'react-router-dom';
function sidebar() {
 
  const location = useLocation(); // Get the current route

  const isActive = (path) => location.pathname === path;

  return (
    // fixed sidebar on left side
    <Box sx={{ height: '100%', bgcolor: sidebarBgcolor, borderTopRightRadius: "20px", borderBottomRightRadius: "20px", color: 'white' }}>
      <Box sx={{ width: '250px', height: '100%' }}>
        <Stack direction='column' sx={{ padding: '10px 20px', marginTop: '10px' }}>


          <Typography variant='h6' gutterBottom mt={1} sx={{ fontWeight: 'bold' }}>Cells</Typography>
          <Divider sx={{ marginBottom: "5px" }}></Divider>
          <Stack direction="column" spacing={1} >

            <Button to="/value_addition"
              component={Link}
              color='inherit' startIcon={<AddHomeIcon />} sx={{
                paddingLeft: '10px',
                justifyContent: 'flex-start',
                fontSize: sidebarFontSize,
                bgcolor: isActive('/value_addition') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/value_addition') ? 'rgb(5,84,156)' : 'inherit',
                gap: 1,
                '&:hover': {
                  bgcolor: 'white',
                  color: 'rgb(5,84,156)',
                }

              }}>Value Addition</Button>

            <Button
              to="/patent"
              component={Link}
              color='inherit' startIcon={<AddHomeIcon />} sx={{
                paddingLeft: '10px',
                justifyContent: 'flex-start',
                fontSize: sidebarFontSize,
                bgcolor: isActive('/patent') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/patent') ? 'rgb(5,84,156)' : 'inherit',
                gap: 1,
                '&:hover': {
                  bgcolor: 'white',
                  color: 'rgb(5,84,156)',
                }
              }}>Patent</Button>
            <Button
              to="/app_development"
              component={Link}
              color='inherit' startIcon={<AddHomeIcon />} sx={{
                paddingLeft: '10px',
                justifyContent: 'flex-start',
                fontSize: sidebarFontSize,
                bgcolor: isActive('/app_development') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/app_development') ? 'rgb(5,84,156)' : 'inherit',
                gap: 1,
                '&:hover': {
                  bgcolor: 'white',
                  color: 'rgb(5,84,156)',
                }
              }}>App Development</Button>
          </Stack>


          {/* clubs section */}

          <Typography variant='h6' sx={{ marginTop: '20px', fontWeight: 'bold' }} gutterBottom>Clubs</Typography>
          <Divider sx={{ marginBottom: "5px" }}></Divider>
          <Stack direction="column" spacing={1}>
            <Button 
              to="/tyro"
              component={Link}
            color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              fontSize: sidebarFontSize,
              bgcolor: isActive('/tyro') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/tyro') ? 'rgb(5,84,156)' : 'inherit',
              gap: 1,
              '&:hover': {
                bgcolor: 'white',
                color: 'rgb(5,84,156)',
              }
            }}>TYRO</Button>

            <Button
              to="/illuminati"
              component={Link}
              color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              fontSize: sidebarFontSize,
              bgcolor: isActive('/illuminati') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/illuminati') ? 'rgb(5,84,156)' : 'inherit',
              gap: 1,
              '&:hover': {
                bgcolor: 'white',
                color: 'rgb(5,84,156)',
              }
            }}>Illuminati</Button>
            
            <Button
              to="/equinox"
              component={Link}
            color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              fontSize: sidebarFontSize,
              bgcolor: isActive('/equinox') ? 'rgb(255, 255, 255)' : 'transparent',
                color: isActive('/equinox') ? 'rgb(5,84,156)' : 'inherit',
              gap: 1,
              '&:hover': {
                bgcolor: 'white',
                color: 'rgb(5,84,156)',
              }
            }}>Equinox</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default sidebar