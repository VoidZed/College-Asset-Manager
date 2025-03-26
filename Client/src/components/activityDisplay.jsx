import { Typography, Box, Paper, Grid2, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'

import GridItem from "./activityItem"
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import { batchYear } from '../utils/forms';
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useParams } from 'react-router-dom';
import axios from "axios"
import { routes } from "../utils/routes"
import ErrorPage from './ErrorPage';
import Action from './Action';
import AnalyticsPdfButton from './AnalyticsPdfButton ';
import { getDynamicActivities } from '../services/getDynamicActivities';
import { useIsMobile } from '../theme/theme';

function activityDisplay() {

    const isMobile=useIsMobile();
    const { activity_name } = useParams();
 

    const activityData = routes[activity_name]; // Get activity data based on route


    const [selectedYear, setSelectedYear] = useState(batchYear[0]);
    const [activityCount, setActivityCount] = useState({})
    const [dynamicActivity, setDynamicActivity] = useState([])

    console.log("Activity Display: ", activityData, activity_name);

    const activities = [];

    Object.entries(activityData.activity).forEach(([key, val]) => {

        activities.push(key)
    })
    console.log(activities)




    const fetchNumberActivities = async () => {
        //function to get the total number of posts in the activities year wise
        try {
            const data = { activity_name, activities, selectedYear }
            const response = await axios.post("/api/get_activity_count", data, { withCredentials: true })
            if (response.status === 200) {
                console.log("Activity Count: ", response.data.data)
                setActivityCount(response.data.data)
            }


        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        // Define an async function inside useEffect
        const fetchData = async () => {
            try {
                //get the dynamic activities according to the activity name
                const res = await getDynamicActivities(activity_name);
                setDynamicActivity(res);
            } catch (error) {
                console.error('Error fetching dynamic activities:', error);
            }
        };

        fetchData(); // Call the async function

    }, [activity_name]);

    // this fn is called when the year selected or route change
    useEffect(() => {
        fetchNumberActivities()
    }, [selectedYear, activity_name])










    // If activityData is undefined, show 404
    if (!activityData) {
        return (

            <ErrorPage />
        );
    }


    console.log("dynamic state", dynamicActivity)
    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Stack direction='row' spacing={3} marginTop='10px' marginBottom='20px'>
                    <FormControl sx={{ width: "200px" }} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <MenuItem  value='all'>All</MenuItem>
                            {batchYear.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                    <AnalyticsPdfButton
                        activities={activities}
                        selectedYear={selectedYear}
                        activity_name={activity_name}
                    />



                    {/* <FormControl sx={{ width: "100px" }} size="small">
                        <InputLabel >Sem</InputLabel>
                        <Select label='Sem' value={semester}
                            onChange={handleSemesterChange}>

                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Odd">Odd</MenuItem>
                            <MenuItem value="Even">Even</MenuItem>
                        </Select>
                    </FormControl> */}
                </Stack>

                {/* event display card */}
                <Paper sx={{ borderRadius: '10px' }}>
                    <Box sx={{
                        padding: '20px 30px', borderRadius: '10px', bgcolor: 'rgb(5,84,156)',
                        background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)'
                    }}>


                        { isMobile?(
                            <Stack direction="column" spacing={1}>
                            <Stack direction='row' spacing={4}>
                            <Box>
                                <img src={activityData.logo} alt="" height={60} />
                                </Box>
                            <Box flex={2} >
                       
                                <Typography variant="subtitle1" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>{activityData.name}</Typography>       
                            </Box>
                            </Stack>
                            <Box>
                            <Typography  sx={{ color: 'white', fontSize: '12px' }} variant='body1'>{activityData.description}</Typography>
                            </Box>
                        </Stack>
                        ):(
                            
                         <Stack direction="row">
                         <Box flex={2} >
                             <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>{activityData.name}</Typography>
                             <Typography  sx={{ color: 'white', fontSize: '12px' }}>{activityData.description}</Typography>
                         </Box>
                         <Box sx={{ padding: '0 50px' }}>
                             <img src={activityData.logo} alt="" height={80} />
                         </Box>
                     </Stack> 
                        )
                        
                        }

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
                            <GridItem key={key}
                                name={item.name}
                                desc={item.description}
                                year={selectedYear}
                                icon={activityData.activity[key].logo}

                                link={`/${activity_name}/${key}`}
                                count={activityCount[key]}
                            />
                        ))
                    }



                    {/* fill dynamic boxes */}

                    {dynamicActivity && dynamicActivity.map((ele) =>

                    (
                        <GridItem key={ele._id}
                            name={ele.title}
                            desc={ele.description}
                            year={selectedYear}
                            link={`/${activity_name}/${ele.slug}`}
                            icon={ele.logoPath}


                            count={activityCount[ele.slug]}
                        />
                    ))}


                </Grid2>

            </Box>
        </Paper>
    )
}
export default activityDisplay
