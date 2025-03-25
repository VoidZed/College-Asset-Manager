import React, { useState ,useEffect} from 'react'
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

const Profile = () => {
    // const StyledTableRow = styled(TableRow)(({ theme }) => ({
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: '#FEFCF8',
    //     },
    //     // hide last border
    //     '&:last-child td, &:last-child th': {
    //         border: 0,

    //     },
    // }));
    const authData = useSelector((state) => state.auth)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedYear, setSelectedYear] = useState(batchYear[0]);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
            id: 'population',
            label: 'Population',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'Density',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
    ];

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const data = [
        { activity: 'MOU', frequency: 45 },
        { activity: 'Conference', frequency: 20 },
        { activity: 'Seminar', frequency: 55 },
        { activity: 'TechVyom Event', frequency: 40 },
        { activity: 'Workshop', frequency: 25 },
        { activity: 'Day Celebration', frequency: 20 },
        { activity: 'Patent', frequency: 18 },
        { activity: 'Guest Lecture', frequency: 33 },
        { activity: 'Aamod', frequency: 45 },
        { activity: 'Alumini Meet', frequency: 7 }
    ];


    const getProfileData = async () => {
        try {
            const data = {
                userId: authData.userId,
                year: selectedYear

            }
            const response = await axios.post('/api/getProfileData', data)
            console.log(response)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        getProfileData()
    },[selectedYear])

    console.log("Chart Data:", data);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
            {/* front and back navigation */}
            <Action />

            <Box sx={{ width: '70%', margin: 'auto', marginTop: '20px', pb: 3 }}>
                <Stack direction='row' p={1} display='flex' justifyContent='flex-start' alignItems='center' spacing={1}>
                    <PersonIcon sx={{ fontSize: '35px', color: '#40403f' }} />
                    <Typography variant='h5'>User Profile</Typography>
                </Stack>
                <Divider />
                <Card elevation={2} sx={{ mb: 3, pt: 4, pb: 4, pl: 4, borderRadius: 2, mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box display="flex" justifyContent="flex-start" alignItems="start" height="100%">
                                <Avatar
                                    src={profileImg}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        border: '1px solid',
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                <Typography variant="h6" fontWeight='500'>
                                    Name
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Dheerendra
                                </Typography>
                                <Typography variant="h6" fontWeight="500" mt={2}>
                                    Email
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    dixit.dheerendra@gmail.com
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Box textAlign="center">
                                    <Typography variant="h6" fontWeight="500">
                                        Role
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Student
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>

                <Card elevation={2} sx={{ mb: 3, p: 4, borderRadius: 2 }}>
                    <Stack direction='row' alignItems="center" spacing={2}>
                        <Typography variant="h5" >Activities</Typography>
                        <FormControl
                            sx={{ width: "150px" }} size="small"
                        >
                            <InputLabel id="year-select-label" sx={{ fontSize: '1rem' }} >Year</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                label="Year"
                                name='year'
                                value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}
                                sx={{ fontSize: '1rem' }}
                            >
                                {batchYear.map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <TableContainer sx={{ maxHeight: 440, marginTop: '20px' }} >
                        <Table >
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
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>



                <Card elevation={2} sx={{ mb: 3, pt: 4, pb: 4, pl: 4, borderRadius: 2 }}>
                    <Typography variant='h5'>Analytics</Typography>
                    <Typography variant='h6' color="text.secondary">Contribution Chart- 2025-2026</Typography>

                    <Box >
                        {/* Bar Chart */}
                        <Stack direction='column' spacing={1} >
                            <Box sx={{ width: '100%', height: 500 }}>
                                <Typography variant='subtitle1' align="center">Activities - Bar Chart</Typography>
                                <ResponsiveContainer width="100%" height="85%">
                                    <BarChart
                                        data={data}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                    >
                                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                        <XAxis
                                            dataKey="activity"
                                            angle={-45}
                                            textAnchor="end"
                                            interval={0}
                                            height={100}
                                            fontSize={10}
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                        />
                                        <Bar dataKey="frequency" fill="#8884d8">
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={130}
                                            fill="#8884d8"
                                            dataKey="frequency"
                                            nameKey="activity"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            </Box>
        </Paper>
    )
}

export default Profile;