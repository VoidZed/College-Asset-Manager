import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import ActivityDisplay from "./activityDisplay"
import { Box, Stack } from '@mui/material';
import { activityDisplayPadding } from '../utils/dimension';
import GuestLecture from './forms/guestLecture';
import ActivityTable from "./activityTable"

function activitySelection() {
  return (

    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar></Navbar>

      {/* <Stack direction='row' sx={{ flex: 1 }}> */}
      <Stack direction='row' sx={{ flex: 1, overflow: 'hidden' }}>
        <Box sx={{}}>
          <Sidebar></Sidebar>
        </Box>

        {/* <Box sx={{ padding: '10px' }} > */}
        <Box sx={{ padding: activityDisplayPadding, flex: 1, height: '100%' }}>

          {/* this will be replaced by the outlet section */}
          {/* <ActivityDisplay></ActivityDisplay> */}
          {/* <GuestLecture></GuestLecture> */}
          <ActivityTable></ActivityTable>
        </Box>
      </Stack>
    </Box>
  )
}


export default activitySelection

