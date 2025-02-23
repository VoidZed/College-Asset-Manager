import React from 'react'
import { AppBar, IconButton, Stack, Toolbar, Avatar, Box, Typography, Icon } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SrmsLogo from "../assets/srms_logo.png"

function navbar() {
  return (
    <AppBar position='relative' sx={{
      boxShadow:"none",
      bgcolor:"#faf7f7"
    }} >
      <Toolbar >
        <IconButton size='small' edge="start">
          <img src={SrmsLogo} alt="Logo" height={45} />
        </IconButton>

        <Stack direction='row' width='100%'>

          {/* sample flex box to take up the space in between */}
          <Box sx={{ flexGrow: 1 }}></Box>

          {/* right user info */}
          <Box sx={{ display: 'flex' }}>

            <Avatar>A</Avatar>
            <Stack direction='column' ml={1} mr={1} color='black'>
              <Typography variant='heading1'>Amit Verma</Typography>
              <Typography variant='heading2'>Principal</Typography>
            </Stack>

            {/* on icon click display menu showing logout button  */}
            <IconButton color='black'>
              <ArrowDropDownIcon ></ArrowDropDownIcon>
            </IconButton>
          </Box>

        </Stack>

      </Toolbar>
    </AppBar>
  )
}

export default navbar