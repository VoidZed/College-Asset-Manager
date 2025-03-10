import { Typography, Box, Paper, Grid2, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React,{useState} from 'react'

import GridItem from "./activityItem"
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import { batchYear } from '../utils/forms';
import { useParams } from 'react-router-dom';

import { routes } from "../utils/routes"
import ErrorPage from './ErrorPage';
import Action from './Action';

function activityDisplay() {

   
    const { activity_name } = useParams();

    const activityData = routes[activity_name]; // Get activity data based on route


    const [selectedYear, setSelectedYear] = useState(batchYear[0]);

    console.log(activityData);


    




    // If activityData is undefined, show 404
    if (!activityData) {
        return (
          
            <ErrorPage/>
        );
    }
    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Stack direction='row' spacing={1} marginTop='10px' marginBottom='20px'>
                    <FormControl sx={{ width: "200px" }} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            {batchYear.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}


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
                            <Box flex={2} >
                                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>{activityData.name}</Typography>
                                <Typography variant="body2" component="p" sx={{ color: 'white' }}>{activityData.description}</Typography>
                            </Box>
                            <Box sx={{ padding: '0 50px' }}>
                                <img src={activityData.logo} alt="" height={80} />
                            </Box>
                        </Stack>

                    </Box>
                </Paper>


                {/* actibity items  */}
                <Typography variant='h5' mt={3} gutterBottom sx={{ fontWeight: 'bold', marginBottom: '15px', color: '#696969' }}>Activities</Typography>

                {/* grid showing activity item cards */}

                <Grid2 container spacing={2.5} mb={8} gap={6} justifyItems='start'>



                    {/* {activityData.activity.map((item,index) => (
                        
                        <GridItem key={index} name={item.name} desc={item.description}></GridItem>
                    ))} */}
                    {activityData && activityData.activity &&
                        Object.entries(activityData.activity).map(([key, item]) => (
                            <GridItem key={key} name={item.name} desc={item.description} year={selectedYear} icon={ activityData.activity[key].logo} link={`/${activity_name}/${key}`}/>
                        ))
                    }


                </Grid2>

            </Box>
        </Paper>
    )
}
export default activityDisplay
