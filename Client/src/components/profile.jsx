import React, { useState, useEffect } from 'react'
import Action from './Action'
import {
    Avatar,
    Box,
    Card,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography
} from '@mui/material'
import { activityDisplayInternalPadding } from '../utils/dimension'
import { navbarColor } from '../utils/color'
import { batchYear } from '../utils/forms'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';

import profileImg from '../assets/user_profile.png'

// Function to generate a random color
const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

// Function to generate unique colors based on the number of activities
const generateUniqueColors = (count) => {
    const colors = [];
    const colorSet = new Set(); // To ensure unique colors

    while (colors.length < count) {
        const newColor = generateRandomColor();
        if (!colorSet.has(newColor)) {
            colors.push(newColor);
            colorSet.add(newColor);
        }
    }

    return colors;
};

const Profile = () => {
    const authData = useSelector((state) => state.auth)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedYear, setSelectedYear] = useState(batchYear[0]);
    const [user, setUser] = useState({});
    const [activities, setActivities] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartColors, setChartColors] = useState([]);

    const columns = [
        { id: 'serialNo', label: 'Serial No.', minWidth: 100 },
        { id: 'activityName', label: 'Activity Name', minWidth: 200 },
        {
            id: 'count',
            label: 'Count',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toLocaleString('en-US')
        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getProfileData = async () => {
        try {
            const data = {
                userId: authData.userId,
                year: selectedYear
            }
            const response = await axios.post('/api/getProfileData', data,{withCredentials:true})
            console.log('Full Response:', response.data);

            // Set user data
            setUser(response.data.user || {});

            // Transform activities data for table and charts
            const activitiesData = response.data.data || {};
            const transformedActivities = Object.entries(activitiesData)
                .filter(([activityName, count]) => count > 0)
                .map(([activityName, count], index) => ({
                    serialNo: index + 1,
                    activityName,
                    count
                }))
                .sort((a, b) => b.count - a.count); 

            const chartDataTransformed = transformedActivities.map(activity => ({
                activity: activity.activityName,
                frequency: activity.count
            }));

            // Generate unique random colors based on the number of activities
            const uniqueColors = generateUniqueColors(chartDataTransformed.length);

            console.log('Transformed Activities:', transformedActivities);
            console.log('Chart Data:', chartDataTransformed);
            console.log('Chart Colors:', uniqueColors);

            setActivities(transformedActivities);
            setChartData(chartDataTransformed);
            setChartColors(uniqueColors);

        } catch (error) {
            console.error('Error fetching profile data:', error);
            setUser({});
            setActivities([]);
            setChartData([]);
            setChartColors([]);
        }
    }

    useEffect(() => {
        getProfileData()
    }, [selectedYear, authData.userId])

    return (
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                overflowY: 'auto',
                padding: activityDisplayInternalPadding,
                bgcolor: navbarColor,
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
            }}
        >
            <Action />

            <Box sx={{ width: '70%', margin: 'auto', marginTop: '20px', pb: 3 }}>
                {/* User Profile Section */}
                <Stack direction='row' p={1} display='flex' justifyContent='flex-start' alignItems='center' spacing={1}>
                    <PersonIcon sx={{ fontSize: '25px', color: '#40403f' }} />
                    <Typography variant='h6'>User Profile</Typography>
                </Stack>
                <Divider />
                <Card elevation={2} sx={{ mb: 3, p: 3, borderRadius: 2, mt: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                            <Avatar
                                src={profileImg}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    border: '1px solid',
                                    margin: 'auto'
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Typography variant="subtitle1" fontWeight="500" mr={1}>Name:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.name || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Typography variant="subtitle1" fontWeight="500" mr={1}>Role:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.role || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Typography variant="subtitle1" fontWeight="500" mr={1}>Email:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.email || 'N/A'}
                                    </Typography>
                                </Grid>
                              
                                <Grid item xs={6} display="flex" alignItems="center">
                                    <Typography variant="subtitle1" fontWeight="500" mr={1}>Updated:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>

                {/* Activities Table Section */}
                <Card elevation={2} sx={{ mb: 3, p: 4, borderRadius: 2 }}>
                    <Stack direction='row' alignItems="center" spacing={2}>
                        <Typography variant="h6">Activities</Typography>
                        <FormControl sx={{ width: "150px" }} size="small">
                            <InputLabel id="year-select-label" sx={{ fontSize: '1rem' }}>Year</InputLabel>
                            <Select
                            size='small'
                                labelId="year-select-label"
                                id="year-select"
                                label="Year"
                                name='year'
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                
                            >
                                {batchYear.map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    {activities.length > 0 ? (
                        <>
                            <TableContainer sx={{ maxHeight: 440, marginTop: '20px' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: "#2774AE" }}>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {activities
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.serialNo}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={activities.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                            No activities found for the selected year.
                        </Typography>
                    )}
                </Card>

                {/* Analytics Section */}
                {chartData.length > 0 && (
                    <Card elevation={2} sx={{ mb: 3, pt: 4, pb: 4, pl: 4, borderRadius: 2 }}>
                        <Typography variant='h6'>Analytics</Typography>
                        <Typography variant='subtitle2' color="text.secondary">Contribution Chart- {selectedYear}</Typography>

                        <Box>
                            <Stack direction='column' spacing={1}>
                                {/* Bar Chart */}
                                <Box sx={{ width: '100%', height: 500 }}>
                                    <Typography variant='subtitle1' align="center">Activities - Bar Chart</Typography>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <BarChart
                                            data={chartData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                        >
                                            <XAxis
                                                dataKey="activity"
                                                angle={-45}
                                                textAnchor="end"
                                                interval={0}
                                                height={100}
                                                fontSize={10}
                                            />
                                            <YAxis allowDecimals={false}/>
                                            <Tooltip />
                                            <Legend
                                                verticalAlign="top"
                                                height={36}
                                            />
                                            <Bar dataKey="frequency" fill="#8884d8">
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={chartColors[index]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>

                                {/* Pie Chart */}
                                <Box sx={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
                                    <Typography variant='subtitle1' align="center">Activities Distribution - Pie Chart</Typography>
                                    <ResponsiveContainer width="100%" height="85%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={130}
                                                fill="#8884d8"
                                                dataKey="frequency"
                                                nameKey="activity"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={chartColors[index]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: 100 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                )}
            </Box>
        </Paper>
    )
}

export default Profile;