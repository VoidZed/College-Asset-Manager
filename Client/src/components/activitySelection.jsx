import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import ActivityDisplay from "./activityDisplay"
import { Box, Stack } from '@mui/material';
import { activityDisplayPadding } from '../utils/dimension';
import GuestLecture from './forms/guestLecture';
import ActivityTable from "./activityTable"
import ActivityBlog from './activityBlog';
function activitySelection() {
  return (

    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
      <Navbar></Navbar>

      {/* <Stack direction='row' sx={{ flex: 1 }}> */}
      <Stack direction='row' sx={{ flex: 1, overflowY: 'hidden' }}>
        <Box sx={{}}>
          <Sidebar></Sidebar>
        </Box>

        {/* <Box sx={{ padding: '10px' }} > */}
        <Box sx={{ padding: activityDisplayPadding, flex: 1, height: '100%' }}>

          {/* this will be replaced by the outlet section */}
          {/* <ActivityDisplay></ActivityDisplay> */}
          {/* <GuestLecture></GuestLecture> */}
<<<<<<< HEAD
          {/* <ActivityTable></ActivityTable> */}
          <ActivityBlog></ActivityBlog>
=======
          <ActivityTable></ActivityTable>
>>>>>>> 57a3596531ca7d755bc98c85dcd034889973e2f5
        </Box>
      </Stack>
    </Box>
  )
}


export default activitySelection

