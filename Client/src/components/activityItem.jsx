import React from 'react'
import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge } from '@mui/material'
import PatentLogo from "../assets/patent.png"
import {activityDisplayCardHead,activityDisplayCardImgHeight} from "../utils/dimension"

function activityItem() {
    const cardWidth = '200px'
    return (


        <Grid2 item xs={12} sm={6} md={4} lg={3} sx={{userSelect:'none',cursor:'pointer'}}>
            <Badge badgeContent={4} color="primary"  >
                <Paper sx={{ width: cardWidth
                    
                 }}>
                    <Box sx={{ padding: '10px' }}>
                        <Stack direction="row" mb={1}>
                            <img src={PatentLogo} alt="" height={activityDisplayCardImgHeight} />
                            <Typography variant="h6" component="h2" ml={1} sx={{fontSize:activityDisplayCardHead ,fontWeight:'bold'}}>Patent</Typography>
                        </Stack>
                        <Typography variant="body2" component="p" sx={{fontSize:'12px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing</Typography>
                    </Box>
                </Paper>
            </Badge>
        </Grid2>
    )
}

export default activityItem