import { Typography, Box, Toolbar, Button, Paper, Grid2, Stack, Badge, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React from 'react'
import DevLogo from '../assets/app-development.png'
import GridItem from "./activityItem"
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';

function activityDisplay() {

    const cardItems = Array.from({ length: 7 }, (_, i) => `Activity ${i + 1}`);
    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Stack direction='row' spacing={1} marginTop='10px' marginBottom='20px'>
                    <FormControl sx={{ width: "200px"}} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year'> 
                            <MenuItem value="year1">Year 1</MenuItem>
                            <MenuItem value="year2">Year 2</MenuItem>
                            <MenuItem value="year3">Year 3</MenuItem>
                            <MenuItem value="year4">Year 4</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "100px" }} size="small">
                        <InputLabel >Sem</InputLabel>
                        <Select label='Sem'>
                            <MenuItem value="odd">Odd</MenuItem>
                            <MenuItem value="even">Even</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {/* event display card */}
                <Paper sx={{ borderRadius: '10px' }}>
                    <Box sx={{
                        padding: '20px 30px', borderRadius: '10px', bgcolor: 'rgb(5,84,156)',
                        background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)'
                    }}>

                        <Stack direction="row">
                            <Box >
                                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>App Development Cell</Typography>
                                <Typography variant="body2" component="p" sx={{ color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perspiciatis, nisi, soluta quisquam similique quia laudantium, distinctio esse maiores harum cupiditate? Voluptate facilis quo aliquam, quos necessitatibus cupiditate perferendis alias!</Typography>
                            </Box>
                            <Box sx={{ padding: '0 50px' }}>
                                <img src={DevLogo} alt="" height={80} />
                            </Box>
                        </Stack>

                    </Box>
                </Paper>


                {/* actibity items  */}
                <Typography variant='h5' mt={3} gutterBottom sx={{ fontWeight: 'bold', marginBottom: '15px', color: '#696969' }}>Activities</Typography>

                {/* grid showing activity item cards */}

                <Grid2 container spacing={2.5} mb={8} gap={6} justifyItems='start'>



                    {cardItems.map((item) => (
                        <GridItem key={item} ></GridItem>
                    ))}


                </Grid2>

            </Box>
        </Paper>
    )
}
export default activityDisplay