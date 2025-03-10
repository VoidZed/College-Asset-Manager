import React from 'react'
import { Typography, Box, Paper, Grid2, Stack, Badge } from '@mui/material'

import { activityDisplayCardHead, activityDisplayCardImgHeight } from "../utils/dimension"
import { Link } from "react-router-dom"
import DateRangeIcon from '@mui/icons-material/DateRange';

function activityItem({ name, desc, link,year,icon}) {
    const cardWidth = '200px'
   
    
    return (


        <Grid2 item xs={12} sm={6} md={4} lg={3} sx={{
            userSelect: 'none', cursor: 'pointer', '&:hover': {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transform: 'translateY(-2px)',
            }
        }}>
            <Badge badgeContent={4} color="primary"  >
                <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Paper sx={{
                        width: cardWidth

                    }}>
                        <Box sx={{ padding: '10px' }}>
                            <Stack direction="row" mb={1}>
                            {icon &&  <img src={icon } alt="" height={activityDisplayCardImgHeight} />}
                                <Typography variant="h6" component="h2" ml={1} sx={{ fontSize: activityDisplayCardHead, fontWeight: 'bold' }}>{name}</Typography>
                            </Stack>
                            <Typography variant="body2" component="p" sx={{ fontSize: '12px' }}>{desc}</Typography>
                        </Box>

                        <Stack direction="row" sx={{ padding: '10px', borderTop: '1px solid #f0f0f0', justifyContent: 'space-between' }}>
                            <Stack direction="row" alignItems="center" >
                                <DateRangeIcon sx={{ fontSize: '15px',marginRight:'3px' }}></DateRangeIcon>
                                <Typography variant="body2" color="initial" sx={{ fontSize: '12px',color:'#454545' }}>{year}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography variant="body2" color="initial" sx={{ fontSize: '12px',color:'#454545' }}>Total:</Typography>
                                <Typography variant="body2" color="initial" sx={{ fontSize: '12px' ,color:'#454545'}}>20</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Link>
            </Badge>

        </Grid2>
    )
}

export default activityItem