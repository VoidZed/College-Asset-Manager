import React from 'react'
import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge } from '@mui/material'
import PatentLogo from "../assets/patent.png"
import {activityDisplayCardHead,activityDisplayCardImgHeight} from "../utils/dimension"
import {Link} from "react-router-dom"
function activityItem({name,desc,link}) {
    const cardWidth = '200px'
    return (


        <Grid2 item xs={12} sm={6} md={4} lg={3} sx={{userSelect:'none',cursor:'pointer',   '&:hover': {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
            transform: 'translateY(-2px)',
          }}}>
            <Badge badgeContent={4} color="primary"  >
                <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper sx={{ width: cardWidth
                    
                 }}>
                    <Box sx={{ padding: '10px' }}>
                        <Stack direction="row" mb={1}>
                            <img src={PatentLogo} alt="" height={activityDisplayCardImgHeight} />
                            <Typography variant="h6" component="h2" ml={1} sx={{fontSize:activityDisplayCardHead ,fontWeight:'bold'}}>{name}</Typography>
                        </Stack>
                        <Typography variant="body2" component="p" sx={{fontSize:'12px'}}>{desc}</Typography>
                    </Box>
                </Paper>
                </Link>
            </Badge>
        </Grid2>
    )
}

export default activityItem