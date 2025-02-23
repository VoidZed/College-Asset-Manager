import { Typography, Box, Divider, Stack, Button, Paper } from '@mui/material'
import React from 'react'
import AddHomeIcon from '@mui/icons-material/AddHome';
function sidebar() {
  return (
    // fixed sidebar on left side
    <Paper sx={{ height: '100%' }}>
      <Box sx={{ bgcolor: 'skyblue', width: '250px', height: '100%' }}>
        <Stack direction='column' sx={{ padding: '1px 10px', marginTop: '10px' }}>


          <Typography variant='h6'>Cells</Typography>
          <Divider></Divider>
          <Stack direction="column">
            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>Value Addition</Button>

            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>Patent</Button>
            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>Hackathon</Button>
          </Stack>


          {/* clubs section */}

          <Typography variant='h6' sx={{ marginTop: '20px' }}>Clubs</Typography>
          <Divider></Divider>
          <Stack direction="column">
            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>TYRO</Button>

            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>Illuminati</Button>
            <Button color='inherit' startIcon={<AddHomeIcon />} sx={{
              paddingLeft: '10px',
              justifyContent: 'flex-start',
              gap: 1,
            }}>Equinox</Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export default sidebar