import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge } from '@mui/material'
import React from 'react'
import DevLogo from '../assets/app-development.png'
import GridItem from "./activityItem"
import { navbarColor } from '../utils/color';

function activityDisplay() {

    const cardItems = Array.from({ length: 30 }, (_, i) => `Activity ${i + 1}`);
    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: '5px 20px', bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Toolbar>
                    <Button>Year</Button>
                    <Button>Sem</Button>
                </Toolbar>

                {/* event display card */}
                <Paper sx={{borderRadius: '10px'}}>
                <Box sx={{
                    padding: '20px 30px', borderRadius: '10px', bgcolor: 'rgb(5,84,156)',
                    background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)'
                }}>
                    
                    <Stack direction="row">
                        <Box >
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' ,color:'white'}}>App Development Cell</Typography>
                            <Typography variant="body2" component="p" sx={{color:'white'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!</Typography>
                        </Box>
                        <Box sx={{ padding: '0 50px' }}>
                            <img src={DevLogo} alt="" height={80} />
                        </Box>
                    </Stack>

                </Box>
                </Paper>


                {/* actibity items  */}
                <Typography variant='h5' mt={3} gutterBottom sx={{fontWeight:'bold',marginBottom:'15px'}}>Activities</Typography>

                {/* grid showing activity item cards */}
                <Grid2 container spacing={2.5} mb={8} justifyContent="space-around">



                    {cardItems.map((item) => (
                        <GridItem key={item}></GridItem>
                    ))}


                </Grid2>
            </Box>
        </Paper>
    )
}
export default activityDisplay