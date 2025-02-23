import React from 'react'
import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge } from '@mui/material'
import PatentLogo from "../assets/patent.png"
function activityItem() {
    const cardWidth = '200px'
    return (


        <Grid2 item lg={2} sx={{}}>
            <Badge badgeContent={4} color="primary"  >
                <Paper sx={{ width: cardWidth }}>
                    <Box sx={{ padding: '10px' }}>
                        <Stack direction="row">
                            <img src={PatentLogo} alt="" height="30" />
                            <Typography variant="h6" component="h2">Patent</Typography>
                        </Stack>
                        <Typography variant="body2" component="p">Lorem ipsum dolor sit amet, consectetur adipiscing</Typography>
                    </Box>
                </Paper>
            </Badge>
        </Grid2>
    )
}

export default activityItem