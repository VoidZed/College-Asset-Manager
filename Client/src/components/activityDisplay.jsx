import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge } from '@mui/material'
import React from 'react'
import DevLogo from '../assets/app-development.png'
import GridItem from "./activityItem"

function activityDisplay() {

    const cardItems = Array.from({ length: 30 }, (_, i) => `Activity ${i + 1}`);
    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '5px 10px' }}>

            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Toolbar>
                    <Button>Year</Button>
                    <Button>Sem</Button>
                </Toolbar>

                {/* event display card */}
                <Box sx={{ padding: '20px 10px', borderRadius: '10px', bgcolor: "skyblue" }}>
                    <Stack direction="row">
                        <Box >
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>App Development Cell</Typography>
                            <Typography variant="body2" component="p" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!</Typography>
                        </Box>
                        <Box sx={{ padding: '0 50px' }}>
                            <img src={DevLogo} alt="" height={80} />
                        </Box>
                    </Stack>

                </Box>


                {/* actibity items  */}
                <Typography variant='h5' mt={3} gutterBottom>Activities</Typography>

                {/* grid showing activity item cards */}
                <Grid2 container spacing={2.5} >



                    {cardItems.map((item) => (
                        <GridItem key={item}></GridItem>
                    ))}


                </Grid2>
            </Box>
        </Paper>
    )
}
export default activityDisplay