import { Typography, Box, Paper, Grid2, Stack, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material'
import React, { useEffect, useState, useCallback } from 'react'

import GridItem from "./activityItem"
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import { batchYear } from '../utils/forms';
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios"
import { routes } from "../utils/routes"
import ErrorPage from './ErrorPage';
import Action from './Action';
import AnalyticsPdfButton from './AnalyticsPdfButton ';
import { getDynamicActivities } from '../services/getDynamicActivities';
import { useIsMobile } from '../theme/theme';
import debounce from "lodash.debounce";

import { useSelector } from 'react-redux';
function activityDisplay() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate(); // Add navigation hook
    const isMobile = useIsMobile();
    const { activity_name } = useParams();
    const activityData = routes[activity_name]; // Get activity data based on route

    const [selectedYear, setSelectedYear] = useState(batchYear[0]);
    const [activityCount, setActivityCount] = useState({});
    const [dynamicActivity, setDynamicActivity] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]); // For holding filtered activities
    const [searchTerm, setSearchTerm] = useState("");

    const activities = [];

    Object.entries(activityData.activity).forEach(([key, val]) => {
        activities.push(key);
    });

    // Debounced function to update the search term
    const debouncedSearch = useCallback(
        debounce((term) => setSearchTerm(term), 500),
        []
    );


    // Redirect to login if not logged in
    const redirectToLogin = () => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to your login route
            return true; // Return true to indicate redirection happened
        }
        return false; // Return false if no redirection needed
    };

    // Filter the activities based on the search term
    useEffect(() => {
        const filtered = allActivities.filter((activity) =>
            // Check if it's a static or dynamic activity
            (activity.type === 'static'
                ? activity.name.toLowerCase() // For static, use 'name'
                : activity.title.toLowerCase() // For dynamic, use 'title'
            ).includes(searchTerm.toLowerCase()) // Case-insensitive search
        );
        setFilteredActivities(filtered);
    }, [searchTerm, allActivities]); // Only re-filter when searchTerm or allActivities changes

    const fetchNumberActivities = async () => {
        try {
            const data = { activity_name, activities, selectedYear };
            const response = await axios.post("/api/get_activity_count", data, { withCredentials: true });
            if (response.status === 200) {
                setActivityCount(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleYearChange = (e) => {
        if (redirectToLogin()) return;
        setSelectedYear(e)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDynamicActivities(activity_name);
                if (res.status === 403) {
                    console.log("Forbidden")
                }
                setDynamicActivity(res.forms);
            } catch (error) {
                console.error('Error fetching dynamic activities:', error);
            }
        };
        fetchData();
    }, [activity_name]);

    useEffect(() => {
        fetchNumberActivities();
    }, [selectedYear, activity_name]);

    useEffect(() => {
        // Combine static and dynamic activities only once
        if (activityData) {
            const staticActivities = Object.entries(activityData.activity).map(([key, value]) => ({
                ...value,
                slug: key, // Add slug to each activity for easy navigation
                type: 'static'
            }));

            const allCombinedActivities = [
                ...staticActivities,
                ...dynamicActivity.map(activity => ({
                    ...activity,
                    type: 'dynamic'
                }))
            ];

            setAllActivities(allCombinedActivities);
            setFilteredActivities(allCombinedActivities); // Set initially filtered activities to all
        }
    }, [activityData, dynamicActivity]);

    if (!activityData) {
        return <ErrorPage />;
    }


    console.log("Filter Activities: ", filteredActivities)

    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* toolbar for showing the year and sem selection */}
                <Stack direction='row' spacing={3} marginTop='10px' marginBottom='20px'>
                    <FormControl sx={{ width: "200px" }} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year' value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
                            <MenuItem value='all'>All</MenuItem>
                            {batchYear.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>
                    <AnalyticsPdfButton
                        activities={activities}
                        selectedYear={selectedYear}
                        activity_name={activity_name}
                        redirect={redirectToLogin}
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


                        {isMobile ? (
                            <Stack direction="column" spacing={1}>
                                <Stack direction='row' spacing={4} alignItems="center">
                                    <Box>
                                        <img src={activityData.logo} alt="" height={60} />
                                    </Box>
                                    <Box flex={2} >

                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>{activityData.name}</Typography>
                                    </Box>
                                </Stack>
                                <Box>
                                    <Typography sx={{ color: 'white', fontSize: '12px' }} variant='body1'>{activityData.description}</Typography>
                                </Box>
                            </Stack>
                        ) : (

                            <Stack direction="row">
                                <Box flex={2} >
                                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>{activityData.name}</Typography>
                                    <Typography sx={{ color: 'white', fontSize: '12px' }}>{activityData.description}</Typography>
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
                <Stack direction="row" sx={{ mt: 3, mb: 3,width:'100%' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: '15px', color: '#696969' }}>Activities</Typography>
                    <TextField id="outlined-basic" label="Search Activities" variant="outlined" size='small' sx={{ borderRadius: '20px', ml: 2 }} onChange={(e) => debouncedSearch(e.target.value)} />
                </Stack>
                {/* grid showing activity item cards */}

                <Grid2 container spacing={2.5} mb={8} gap={6} justifyItems='start'>



                    {/* {activityData.activity.map((item,index) => (
                        
                        <GridItem key={index} name={item.name} desc={item.description}></GridItem>
                    ))} */}
                    {filteredActivities.map((item, key) => (
                        <GridItem key={key}
                            name={item.name || item.title}
                            desc={item.description}
                            year={selectedYear}
                            icon={item.logo || item.logoPath}

                            link={`/${activity_name}/${item.slug}`}
                            count={activityCount[item.slug]}
                        />
                    ))
                    }



                    {/* fill dynamic boxes */}

                    {/* {dynamicActivity && dynamicActivity.map((ele) =>

                    (
                        <GridItem key={ele._id}
                            name={ele.title}
                            desc={ele.description}
                            year={selectedYear}
                            link={`/${activity_name}/${ele.slug}`}
                            icon={ele.logoPath}


                            count={activityCount[ele.slug]}
                        />
                    ))} */}


                </Grid2>

            </Box>
        </Paper>
    )
}
export default activityDisplay