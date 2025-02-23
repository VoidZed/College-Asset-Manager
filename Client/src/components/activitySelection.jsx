import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import ActivityDisplay from "./activityDisplay"
import { Box, Stack } from '@mui/material';



function activitySelection() {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar></Navbar>
        <Stack direction='row' sx={{ flex: 1 }}>
          <Box sx={{  bgcolor: 'skyblue' }}>
            <Sidebar></Sidebar>
          </Box>
          <Box sx={{padding:'10px', height: '100%',  overflowY: 'auto'}} >

            {/* this will be replaced by the outlet section */}
            <ActivityDisplay></ActivityDisplay>
          </Box>
        </Stack>
      </Box>
    )
  }
export default activitySelection

