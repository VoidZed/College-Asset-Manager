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
    MenuItem, Typography, CircularProgress

} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from 'react'
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

import { tableHead, table1stRow } from '../utils/table'

import { routes } from "../utils/routes"
import { useParams, Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import CardLogo from '../assets/database.png'
import Action from './Action';
import axios from "axios"
import { department } from '../utils/formData';

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


function activityTable() {


    // url format:-  /value_adition/patent
    const { activity_name, activity_item } = useParams();

    console.log("vbvba", activity_name, activity_item)

    const activityData = routes[activity_name]; // Get activity data based on route
    // If activityData    or activityName adata is undefined, show 404
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item


    if (!activityData || !activityItemName) {
        return (

            <ErrorPage />
        );
    }


    console.log(activityData, activityItemName)

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const [tableData, setTableData] = useState([])
    const [filteredData, setFilteredData] = useState([]);

    const [semester, setSemester] = useState(""); // State to hold selected semester
    const [selectedYear, setSelectedYear] = useState(batchYear[0]);
    const [selectedId, setSelectedId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
        console.log(id)
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSemesterChange = (event) => {
        const selectedSemester = event.target.value;
        setSemester(selectedSemester);

        // Filter data based on selected semester
        const filtered = tableData.filter((row) => {
            if (selectedSemester === "Odd") {
                return row.sem === "Odd"; // Replace 'sem' with actual column name in your data
            } else if (selectedSemester === "Even") {
                return row.sem === "Even"; // Replace 'sem' with actual column name in your data
            }
            return true; // If no semester selected, show all
        });
        setFilteredData(filtered);
    };

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
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };


    //fn to handle the delete logic 

    const handleDelete = async () => {
        // setOpen(false);
        // setSnackbarOpen(true);
        setDeleteLoading(true)

        try {

            const response = await axios.post('/api/delete-post', { activity_name: activity_item, id: selectedId }, { withCredentials: true })
            if (response.status === 200) {
                setOpen(false);
                setAlert({ open: true, message: response.data.message, severity: 'success' });
                // get_table_data()
                // Remove the deleted item from tableData state
                setTableData((prevData) => prevData.filter(row => row._id !== selectedId));
                setFilteredData((prevData) => prevData.filter(row => row._id !== selectedId));
            }
            console.log("Delete Response: ", response)
        } catch (error) {
            console.log("Delete Error: ", error)
            setAlert({ open: true, message: error.response?.data?.message || "An error occurred during delete.", severity: 'error' });

        }
        finally {
            setDeleteLoading(false)
        }
    }










    const get_table_data = async () => {
        try {
           
            const params = {
                "year": selectedYear,
                "activity_name": activity_item
            }
            const response = await axios.get('/api/get-table-data', { params }, { withCredentials: true })
            if (response.status === 200) {
                setTableData(response.data.data)
                setFilteredData(response.data.data);
            }
            console.log("Get Table Data: ", response.data.data)


        } catch (error) {
            console.log(error)
        }
    }


    //fetch data from the server
    useEffect(() => {
        get_table_data()


    }, [selectedYear,activity_item])



    console.log("Table Data: ", tableData)
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
                                disabled={deleteLoading}
                                variant='outlined'
                                color='success'
                                autoFocus
                                onClick={handleClose}
                                sx={{
                                    borderColor: 'green',
                                    color: 'green',
                                    borderRadius: '5px',
                                    padding: '8px 20px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: '#ddffd6',
                                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                    },
                                }}
                            >
                                No
                            </Button>
                            <Button


                                disabled={deleteLoading}

                                variant='outlined'
                                color='error'
                                onClick={handleDelete}
                                autoFocus
                                sx={{
                                    borderColor: 'red',
                                    color: 'red',
                                    borderRadius: '5px',
                                    padding: '8px 20px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        backgroundColor: '#fad9d9',
                                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                    },
                                }}
                            >
                                {deleteLoading ? <CircularProgress size={16} color="inherit" /> : "Yes"}
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>





                {/* toolbar for actions  */}
                <Stack direction='row' spacing={1} marginTop='10px' marginBottom='20px'>

                    <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
                    <FormControl sx={{ width: "200px" }} size="small">
                        <InputLabel >Year</InputLabel>
                        <Select label='Year' value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            {batchYear.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}


                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "100px" }} size="small">
                        <InputLabel >Sem</InputLabel>
                        <Select label='Sem' value={semester}
                            onChange={handleSemesterChange}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Odd">Odd</MenuItem>
                            <MenuItem value="Even">Even</MenuItem>
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
                                    {table1stRow[activity_item] && table1stRow[activity_item].map((item, index) => (
                                        <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />{tableHead[item]}</Stack></TableCell>
                                    ))}
                                    {table1stRow[activity_item] && <TableCell sx={{ fontWeight: 'bold' }}><Stack direction='row'><SettingsIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Actions</Stack></TableCell>
                                    }


                                </TableRow>
                            </TableHead>

                            {/* Table Body with Pagination */}
                            <TableBody>
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>

                                            {table1stRow && table1stRow[activity_item].map((item, index) => {
                                                let value = row[item];
                                                // formated date 
                                                if (item === 'date' || item === 'start_date' || item === 'end_date') {
                                                    value = value.split("T")[0]
                                                }
                                               
                                                //display department values comma separated
                                                else if (item === 'department') {
                                                    value = value.join(" , ")
                                                }



                                                return (
                                                    <TableCell key={index} sx={{ textAlign: 'center' }}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}



                                            <TableCell>
                                                <Stack direction="row">

                                                    <Tooltip title="View">  <Link to={`/${activity_name}/${activity_item}/${row._id}`} style={{ textDecoration: "none" }}><IconButton onClick={handleView}><RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon></IconButton></Link></Tooltip>
                                                    <Tooltip title="Edit">   <IconButton onClick={handleEdit}><EditIcon sx={{ color: editColor }}></EditIcon></IconButton></Tooltip>
                                                    <Tooltip title="Delete">   <IconButton onClick={() => handleClickOpen(row._id)} color='red'><DeleteSweepIcon sx={{ color: deleteColor }}
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
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            {/* Snackbar */}
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
                </Alert>
            </Snackbar>
        </Paper>

    )
}

export default activityTable