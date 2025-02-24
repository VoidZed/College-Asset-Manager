import {
    Paper, Box, Button, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Stack, Tooltip, Chip

} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react'
import { navbarColor,sidebarBgcolor } from '../utils/color';
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

// color import
import { deleteColor, editColor, viewColor } from '../utils/color';

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
        speaker_name: "Dr. John Smith",
        speaker_organisation: "Harvard Medical School",
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

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


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
        alert("View Details");
    }
    const handleEdit = () => {
        alert("Edit Details");
    }
    const handleDelete = () => {
        alert("Delete Details");
    }
    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>


                {/* dialog box code */}


                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Do you want to delete?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           You can't undo after delete.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' disableElevation autoFocus onClick={handleClose} sx={{borderColor:'green',color:'green'}} >
                            No
                        </Button>
                        <Button variant='outlined' disableElevation onClick={handleClose} autoFocus sx={{borderColor:'red',color:'red'}} >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>






                {/* toolbar for actions  */}
                <Stack direction='row'>
                    <Button>Add New</Button>
                    <Button>Year</Button>
                    <Button>Sem</Button>
                </Stack>

                {/* <Typography variant='h6' sx={{ textAlign: "left", marginTop: '20px', color: 'gray' }}>Guest Lecture</Typography> */}
                <Chip label="Guest Lectures" sx={{ color:'white',padding: '20px', width: '200px', bgcolor: sidebarBgcolor, marginTop: '20px', fontWeight: 'bold', fontSize: '15px', borderRadius: '5px' }} />

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
                                                    <Tooltip title="View"><IconButton onClick={handleView}><RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon></IconButton></Tooltip>
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
        </Paper>

    )
}

export default activityTable