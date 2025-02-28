import {
    Paper, Box, Button, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Stack, Tooltip, 
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem, Typography

} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react'
import { navbarColor, sidebarBgcolor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TagIcon from '@mui/icons-material/Tag';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Close as CloseIcon } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { batchYear } from "../utils/forms"
// color import
import { deleteColor, editColor, viewColor } from '../utils/color';
import { routes } from "../utils/routes"
import { useParams, Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import CardLogo from '../assets/database.png'
import Action from './Action';


//even odd color for table row

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FEFCF8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const rows = [
    {
        title: "AI in Healthcare",
        date: "2024-02-10",
        speaker_name: "Mr. Dheerendra Dixt",
        speaker_organisation: "Oxford University",
        number_of_students: 120,
        batch: "2023",
        mode: "Online",
        department: "Computer Science"
    },
    {
        title: "Blockchain Revolution",
        date: "2024-03-05",
        speaker_name: "Ms. Sarah Johnson",
        speaker_organisation: "IBM",
        number_of_students: 95,
        batch: "2024",
        mode: "Offline",
        department: "Information Technology"
    },
    {
        title: "Cybersecurity Trends",
        date: "2024-02-15",
        speaker_name: "Mr. Alan Cooper",
        speaker_organisation: "Cisco",
        number_of_students: 80,
        batch: "2022",
        mode: "Online",
        department: "Cybersecurity"
    },
    {
        title: "Quantum Computing Basics",
        date: "2024-03-12",
        speaker_name: "Dr. Rebecca Lee",
        speaker_organisation: "Google Quantum AI",
        number_of_students: 100,
        batch: "2023",
        mode: "Offline",
        department: "Physics"
    },
    {
        title: "IoT and Smart Cities",
        date: "2024-04-08",
        speaker_name: "Mr. Tom Anderson",
        speaker_organisation: "Intel",
        number_of_students: 130,
        batch: "2025",
        mode: "Online",
        department: "Electronics"
    },
    {
        title: "Cloud Computing & DevOps",
        date: "2024-05-20",
        speaker_name: "Dr. Kevin White",
        speaker_organisation: "Amazon AWS",
        number_of_students: 110,
        batch: "2022",
        mode: "Offline",
        department: "Software Engineering"
    },
    {
        title: "Ethical Hacking",
        date: "2024-06-15",
        speaker_name: "Mr. Daniel Brown",
        speaker_organisation: "Kaspersky",
        number_of_students: 90,
        batch: "2023",
        mode: "Online",
        department: "Cybersecurity"
    },
    {
        title: "Machine Learning in Finance",
        date: "2024-07-25",
        speaker_name: "Dr. Emily Roberts",
        speaker_organisation: "JP Morgan",
        number_of_students: 105,
        batch: "2024",
        mode: "Offline",
        department: "Finance"
    },
    {
        title: "Big Data Analytics",
        date: "2024-08-10",
        speaker_name: "Mr. William Scott",
        speaker_organisation: "Microsoft",
        number_of_students: 115,
        batch: "2025",
        mode: "Online",
        department: "Data Science"
    },
    {
        title: "Renewable Energy Technologies",
        date: "2024-09-30",
        speaker_name: "Ms. Linda Green",
        speaker_organisation: "Tesla Energy",
        number_of_students: 85,
        batch: "2023",
        mode: "Offline",
        department: "Mechanical Engineering"
    },
    {
        title: "AI Ethics and Bias",
        date: "2024-10-05",
        speaker_name: "Dr. Mark Evans",
        speaker_organisation: "MIT",
        number_of_students: 92,
        batch: "2022",
        mode: "Online",
        department: "Artificial Intelligence"
    },
    {
        title: "Space Exploration Advances",
        date: "2024-11-12",
        speaker_name: "Mr. Robert Wilson",
        speaker_organisation: "NASA",
        number_of_students: 125,
        batch: "2024",
        mode: "Offline",
        department: "Aerospace Engineering"
    },
    {
        title: "Autonomous Vehicles",
        date: "2024-12-20",
        speaker_name: "Ms. Laura Davis",
        speaker_organisation: "Tesla",
        number_of_students: 140,
        batch: "2025",
        mode: "Online",
        department: "Mechanical Engineering"
    },
    {
        title: "AR & VR in Education",
        date: "2025-01-15",
        speaker_name: "Mr. Chris Miller",
        speaker_organisation: "Meta",
        number_of_students: 98,
        batch: "2023",
        mode: "Offline",
        department: "Multimedia"
    },
    {
        title: "Sustainable Manufacturing",
        date: "2025-02-25",
        speaker_name: "Dr. Olivia Adams",
        speaker_organisation: "Siemens",
        number_of_students: 78,
        batch: "2022",
        mode: "Online",
        department: "Industrial Engineering"
    }
]

function activityTable() {


    // url format:-  /value_adition/patent
    const { activity_name, activity_item } = useParams();

    console.log("vbvba",activity_name,activity_item)

    const activityData = routes[activity_name]; // Get activity data based on route
    // If activityData    or activityName adata is undefined, show 404
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item


    if (!activityData || !activityItemName) {
        return (
            // <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: navbarColor }}>
            //     <Typography variant="h5" color="error">404 Not Found</Typography>
            // </Paper>
            <ErrorPage />
        );
    }









    console.log(activityData, activityItemName)

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle Page Change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle Rows Per Page Change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const handleView = () => {
        console.log("View Icon Clicked")
    }
    const handleEdit = () => {
        alert("Edit Details");
    }
    // const handleDelete = () => {
    //     alert("Delete Details");
    // }
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleDelete = () => {
        setOpen(false);
        setSnackbarOpen(true);
    }
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };





    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>


                {/* dialog box code */}

                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    sx={{
                        background: 'linear-gradient(135deg, rgba(0, 204, 255, 0.2), rgba(0, 153, 255, 0.2))', 
                        borderRadius: '12px',
                        boxShadow: 24, 
                    }}
                >
                    <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: theme.palette.primary.main }}>
                        {"Do you want to delete?"}
                        <IconButton onClick={handleClose} sx={{ color: theme.palette.text.primary }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ padding: '20px 30px' }}>
                        <DialogContentText sx={{ color: '#5f6368', fontSize: '16px' }}>
                            You can't undo after deletion. Are you sure you want to proceed?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ padding: '16px', justifyContent: 'center' }}>
                        <Stack direction='row' spacing={3} justifyContent='flex-end' width='100%'>
                        
                        <Button
                            variant='outlined'
                            color='success'
                            autoFocus
                            onClick={handleClose}
                            sx={{
                                borderColor:'green',
                                color: 'green',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor:'#ddffd6',
                                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            No
                        </Button>
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={handleDelete}
                            autoFocus
                            sx={{
                                borderColor:'red',
                                color: 'red',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                '&:hover': {
                                    backgroundColor:'#fad9d9',
                                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            Yes
                        </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>



                {/* toolbar for actions  */}
                <Stack direction='row' spacing={1} marginTop='10px' marginBottom='20px'>
                    
                    <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
                    <FormControl sx={{ width: "200px" }} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year'>

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

                {/* <Typography variant='h6' sx={{ textAlign: "left", marginTop: '20px', color: 'gray' }}>Guest Lecture</Typography> */}
                <Stack direction='row' spacing={2} sx={{ color: 'white', width: '97%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                    <Box>
                        <img src={CardLogo} alt="card logo" height='50px' />
                    </Box>
                    <Box>
                        <Typography variant='h5' color='white'>{activityItemName.name}</Typography>
                        <Typography variant='heading2' sx={{ fontWeight: '100' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, nostrum?</Typography>
                    </Box>
                </Stack>

                {/* table section */}

                <Paper sx={{ width: "100%", margin: "10px auto", overflow: "hidden" }}>
                    <TableContainer>
                        <Table>
                            {/* Table Header */}
                            <TableHead sx={{ bgcolor: 'lightgray' }}>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Title</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><TodayIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Date</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><PersonIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Speaker</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row' justifyContent='center' alignItems='center'><BusinessIcon sx={{ fontSize: '20px', marginRight: '5px' }} /><span style={{ lineHeight: 'normal' }}>Speaker Organisation</span></Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row' justifyContent='center' alignItems='center'><PeopleIcon sx={{ fontSize: '20px', marginRight: '5px' }} /><span style={{ lineHeight: 'normal' }}>Total Students</span></Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Batch</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><WifiTetheringIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Mode</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><StoreIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Department</Stack></TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><SettingsIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Actions</Stack></TableCell>
                                </TableRow>
                            </TableHead>

                            {/* Table Body with Pagination */}
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.speaker_name}</TableCell>
                                            <TableCell>{row.speaker_organisation}</TableCell>
                                            <TableCell>{row.number_of_students}</TableCell>
                                            <TableCell>{row.batch}</TableCell>
                                            <TableCell>{row.mode}</TableCell>
                                            <TableCell>{row.department}</TableCell>
                                            <TableCell>
                                                <Stack direction="row">
                                                    <Tooltip title="View">  <Link to={`/${activity_name}/${activity_item}/123`} style={{ textDecoration: "none" }}><IconButton onClick={handleView}><RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon></IconButton></Link></Tooltip>
                                                    <Tooltip title="Edit">   <IconButton onClick={handleEdit}><EditIcon sx={{ color: editColor }}></EditIcon></IconButton></Tooltip>
                                                    <Tooltip title="Delete">   <IconButton onClick={handleClickOpen} color='red'><DeleteSweepIcon sx={{ color: deleteColor }}
                                                    ></DeleteSweepIcon></IconButton></Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination Controls */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Data deleted successfully!
                </Alert>
            </Snackbar>
        </Paper>

    )
}

export default activityTable