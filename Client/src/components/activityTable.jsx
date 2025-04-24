// import {
//     Paper, Box, Button,

//     IconButton,
//     Stack, Tooltip,
//     Snackbar,
//     Alert,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem, Typography, CircularProgress,
//     ToggleButton, ToggleButtonGroup

// } from '@mui/material'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import React, { useState, useEffect } from 'react'
// import { navbarColor } from '../utils/color';
// import { activityDisplayInternalPadding } from '../utils/dimension';


// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { Close as CloseIcon } from '@mui/icons-material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { batchYear } from "../utils/forms"


// import { routes } from "../utils/routes"
// import { useParams, Link } from 'react-router-dom';
// import ErrorPage from './ErrorPage';
// import PhotoTimeline from './photoTimeline';

// import Action from './Action';
// import axios from "axios"
// import { RiFileExcel2Fill } from "react-icons/ri";
// import { BsFiletypeJson } from "react-icons/bs";
// import FilterListIcon from '@mui/icons-material/FilterList';
// import CollectionsIcon from '@mui/icons-material/Collections';
// import TableRowsIcon from '@mui/icons-material/TableRows';
// //even odd color for table row
// import TableComponent from './tableComponent';
// import { useIsMobile } from '../theme/theme';

// import { useDispatch, useSelector } from 'react-redux';


// function activityTable() {

//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     // url format:-  /value_adition/patent
//     const { activity_name, activity_item } = useParams();

//     console.log("vbvba", activity_name, activity_item)

//     const activityData = routes[activity_name]; // Get activity data based on route
//     // If activityData    or activityName adata is undefined, show 404
//     const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item

//     const [isExcelLoading, setIsExcelLoading] = useState(false);
//     const [isJsonLoading, setIsJsonLoading] = useState(false);

//     const [viewType, setViewType] = useState('table')




//     console.log("aaaaa", activityData, activityItemName)

//     const [open, setOpen] = useState(false);


//     const [tableData, setTableData] = useState([])
//     const [filteredData, setFilteredData] = useState([]);

//     const [semester, setSemester] = useState("All"); // State to hold selected semester
//     const [selectedYear, setSelectedYear] = useState(batchYear[0]);
//     const [selectedId, setSelectedId] = useState(null);
//     const [deleteLoading, setDeleteLoading] = useState(false);
//     const [timelineImages, setTimelineImages] = useState([])

//     const [isDynamic, setIsDynamic] = useState(false);
//     const [dynamicFields, setDynamicFields] = useState([]);
//     const [dynamicTitle, setDynamicTitle] = useState({})

//     const handleClickOpen = (id) => {
//         setSelectedId(id);
//         setOpen(true);
//         console.log(id)
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedId(null);
//     };

//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
//     const isMobile = useIsMobile();




//     const handleSemesterChange = (event) => {
//         const selectedSemester = event.target.value;
//         setSemester(selectedSemester);

//         // Filter data based on selected semester
//         const filtered = tableData.filter((row) => {
//             if (selectedSemester === "Odd") {
//                 return row.sem === "Odd"; // Replace 'sem' with actual column name in your data
//             } else if (selectedSemester === "Even") {
//                 return row.sem === "Even"; // Replace 'sem' with actual column name in your data
//             }
//             return true; // If no semester selected, show all
//         });
//         setFilteredData(filtered);
//     };



//     const handleView = (event, newView) => {
//         setViewType(newView);
//     };



//     // const handleDelete = () => {
//     //     alert("Delete Details");
//     // }
//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
//     const handleCloseAlert = (reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setAlert({ ...alert, open: false });
//     };


//     //fn to handle the delete logic 

//     const handleDelete = async () => {
//         // setOpen(false);
//         // setSnackbarOpen(true);
//         setDeleteLoading(true)

//         try {

//             const response = await axios.post('/api/delete-post', { activity_name: activity_item, id: selectedId }, { withCredentials: true })
//             if (response.status === 200) {
//                 setOpen(false);
//                 setAlert({ open: true, message: response.data.message, severity: 'success' });
//                 // get_table_data()
//                 // Remove the deleted item from tableData state

//                 setTableData((prevData) => prevData.filter(row => row._id !== selectedId));
//                 setFilteredData((prevData) => prevData.filter(row => row._id !== selectedId));
//             }
//             console.log("Delete Response: ", response)
//         } catch (error) {
//             console.log("Delete Error: ", error)
//             setAlert({ open: true, message: error.response?.data?.message || "An error occurred during delete.", severity: 'error' });

//         }
//         finally {
//             setDeleteLoading(false)
//         }
//     }
//     const handleExport = async (format) => {
//         // Set loading state based on format
//         const setLoading = format === "excel" ? setIsExcelLoading : setIsJsonLoading;
//         setLoading(true);

//         try {
//             const fileExtension = format === "excel" ? "xlsx" : "json";
//             const fileName = `${activity_item}_${semester}_${selectedYear}_export.${fileExtension}`;
//             const url = `/api/export/${format}/${activity_item}/${selectedYear}/${semester}`;

//             console.log("Exporting from:", url);

//             const response = await axios.get(url, {
//                 responseType: "blob",
//                 withCredentials: true
//             });

//             if (response.status === 200) {
//                 // Create file blob
//                 const fileURL = window.URL.createObjectURL(new Blob([response.data]));
//                 const link = document.createElement("a");
//                 link.href = fileURL;
//                 link.setAttribute("download", fileName);
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 window.URL.revokeObjectURL(fileURL);

//             } else if (response.status === 404) {
//                 throw new Error("No data found for the selected filters.");
//             }
//             else {
//                 throw new Error("Unexpected error occurred. Please try again.");
//             }
//         } catch (error) {
//             console.log("Export Error:", error);


//         } finally {
//             setLoading(false);
//         }
//     };


//     const getTimelineData = async () => {
//         try {
//             const response = await axios.get(`/api/get_photo_timeline/${activity_item}`, { withCredentials: true });
//             console.log("Timeline: ", response.data)
//             setTimelineImages(response.data.data)
//         }
//         catch (error) {
//             console.log("Error fetching timeline data:", error);
//         }
//     }









//     const get_table_data = async () => {
//         try {

//             const params = {
//                 "year": selectedYear,
//                 "activity_name": activity_item
//             }
//             const response = await axios.get('/api/get-table-data', { params }, { withCredentials: true })
//             if (response.status === 200) {
//                 setTableData(response.data.data)
//                 setFilteredData(response.data.data);

//                 //if data is dynamic
//                 setIsDynamic(response.data.isDynamic || false);
//                 if (response.data.isDynamic && response.data.fields) {
//                     setDynamicFields(response.data.fields);
//                     setDynamicTitle(response.data.name)
//                 }
//             }
//             console.log("Get Table Data: ", response.data)


//         } catch (error) {
//             console.log(error)
//         }
//     }


//     //fetch data from the server
//     useEffect(() => {
//         get_table_data()
//         getTimelineData();


//     }, [selectedYear, activity_item])



//     if (!activityData && !activityItemName && tableData.length === 0) {
//         return (

//             <ErrorPage />
//         );
//     }



//     console.log("Table Data: ", tableData)
//     console.log("Timeline Data: ", timelineImages)

//     return (
//         <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
//             <Action></Action>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>


//                 {/* dialog box code */}

//                 <Dialog
//                     fullScreen={isMobile ? false : fullScreen}
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="responsive-dialog-title"
//                     sx={{
//                         background: 'linear-gradient(135deg, rgba(0, 204, 255, 0.2), rgba(0, 153, 255, 0.2))',
//                         borderRadius: '12px',
//                         boxShadow: 24,
//                     }}
//                 >
//                     <DialogTitle id="responsive-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: theme.palette.primary.main }}>
//                         {"Do you want to delete?"}
//                         <IconButton onClick={handleClose} sx={{ color: theme.palette.text.primary }}>
//                             <CloseIcon />
//                         </IconButton>
//                     </DialogTitle>
//                     <DialogContent sx={{ padding: '20px 30px' }}>
//                         <DialogContentText sx={{ color: '#5f6368', fontSize: '16px' }}>
//                             You can't undo after deletion. Are you sure you want to proceed?
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions sx={{ padding: '16px', justifyContent: 'center' }}>
//                         <Stack direction='row' spacing={3} justifyContent='flex-end' width='100%'>

//                             <Button
//                                 disabled={deleteLoading}
//                                 variant='outlined'
//                                 color='success'
//                                 autoFocus
//                                 onClick={handleClose}
//                                 sx={{
//                                     borderColor: 'green',
//                                     color: 'green',
//                                     borderRadius: '5px',
//                                     padding: '8px 20px',
//                                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                     '&:hover': {
//                                         backgroundColor: '#ddffd6',
//                                         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//                                     },
//                                 }}
//                             >
//                                 No
//                             </Button>
//                             <Button


//                                 disabled={deleteLoading}

//                                 variant='outlined'
//                                 color='error'
//                                 onClick={handleDelete}
//                                 autoFocus
//                                 sx={{
//                                     borderColor: 'red',
//                                     color: 'red',
//                                     borderRadius: '5px',
//                                     padding: '8px 20px',
//                                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                     '&:hover': {
//                                         backgroundColor: '#fad9d9',
//                                         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//                                     },
//                                 }}
//                             >
//                                 {deleteLoading ? <CircularProgress size={16} color="inherit" /> : "Yes"}
//                             </Button>
//                         </Stack>
//                     </DialogActions>
//                 </Dialog>





//                 {/* toolbar for actions  */}
//                 {/*for mobile view */}
//                 {isMobile ?
//                     (
//                         <Stack direction='column' spacing={3} marginTop='10px' marginBottom='20px' alignContent="center" justifyContent="space-between" sx={{bgcolor:'white',padding:'8px 4px ',borderRadius:"10px"}}>
//                             <Stack direction='row' spacing={3} alignItems="center" >

//                                 <Box >
//                                     {/* if the form is hardcoded or dynamic */}

//                                     {activityItemName ? (
//                                         <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white', fontSize: '15px' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '16px', marginLeft: '5px' }} /></Button>
//                                     ) : (
//                                         <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 61)', color: 'white', fontSize: '15px' }} component={Link} to={`/${activity_name}/add_dynamic/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '16px', marginLeft: '5px' }} /></Button>
//                                     )}


//                                 </Box>

//                                 {/* view t0ggle */}
//                                 <Box>

//                                     <ToggleButtonGroup size='small' value={viewType}
//                                         exclusive
//                                         onChange={handleView}>
//                                         <Tooltip title="List View">
//                                             <ToggleButton value="table" aria-label="centered" >
//                                                 <TableRowsIcon sx={{ fontSize: '20px' }} />
//                                             </ToggleButton></Tooltip>
//                                         <Tooltip title="Gallery">
//                                             <ToggleButton value="gallery" aria-label="centered">
//                                                 <CollectionsIcon sx={{ fontSize: '20px' }} />
//                                             </ToggleButton></Tooltip>
//                                     </ToggleButtonGroup>

//                                 </Box>

//                                 <Box>

//                                     <Tooltip title="Export to Excel">
//                                         <span>
//                                             <IconButton
//                                                 sx={{ marginLeft: "10px" }}
//                                                 onClick={() => handleExport("excel")}
//                                                 disabled={isExcelLoading} // Disable when loading
//                                             >
//                                                 {isExcelLoading ? <CircularProgress size={24} /> : <RiFileExcel2Fill style={{ fontSize: "30px", color: "green" }} />}
//                                             </IconButton>
//                                         </span>
//                                     </Tooltip>

//                                     <Tooltip title="Export to JSON">
//                                         <span>
//                                             <IconButton
//                                                 sx={{ marginLeft: "5px" }}
//                                                 onClick={() => handleExport("json")}
//                                                 disabled={isJsonLoading} // Disable when loading
//                                             >
//                                                 {isJsonLoading ? <CircularProgress size={24} /> : <BsFiletypeJson style={{ fontSize: "30px", color: "green" }} />}
//                                             </IconButton>
//                                         </span>
//                                     </Tooltip>
//                                 </Box>
//                             </Stack>


//                             <Box display="flex" alignItems="center" >
//                                 {/* filter icon */}
//                                 <FilterListIcon sx={{ fontSize: '35px' }}></FilterListIcon>
//                                 <FormControl sx={{ width: "200px", marginLeft: '10px' }} size="small">
//                                     <InputLabel >Year</InputLabel>
//                                     <Select label='Year' value={selectedYear}
//                                         onChange={(e) => setSelectedYear(e.target.value)}>
//                                         <MenuItem value="All">All</MenuItem>
//                                         {batchYear.map((year, index) => (
//                                             <MenuItem key={index} value={year}>{year}</MenuItem>
//                                         ))}


//                                     </Select>
//                                 </FormControl>

//                                 <FormControl sx={{ width: "100px", marginLeft: '10px' }} size="small">
//                                     <InputLabel >Sem</InputLabel>
//                                     <Select label='Sem' value={semester}
//                                         onChange={handleSemesterChange}>
//                                         <MenuItem value="All">All</MenuItem>
//                                         <MenuItem value="Odd">Odd</MenuItem>
//                                         <MenuItem value="Even">Even</MenuItem>
//                                     </Select>
//                                 </FormControl>

//                             </Box>
//                         </Stack>) : 
//                         (


//                         <Stack direction='row' spacing={1} marginTop='10px' marginBottom='5px' alignContent="center" justifyContent="space-between" sx={{bgcolor:'white',padding:'15px 10px ',borderRadius:"10px"}}>

//                             <Box >
//                                 {/* if the form is hardcoded or dynamic */}

//                                 {activityItemName ? (
//                                     <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
//                                 ) : (
//                                     <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 61)', color: 'white' }} component={Link} to={`/${activity_name}/add_dynamic/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
//                                 )}


//                             </Box>

//                             {/* view t0ggle */}
//                             <Box>

//                                 <ToggleButtonGroup size='small' value={viewType}
//                                     exclusive
//                                     onChange={handleView}>
//                                     <Tooltip title="List View">
//                                         <ToggleButton value="table" aria-label="centered">
//                                             <TableRowsIcon />
//                                         </ToggleButton></Tooltip>
//                                     <Tooltip title="Gallery">
//                                         <ToggleButton value="gallery" aria-label="centered">
//                                             <CollectionsIcon />
//                                         </ToggleButton></Tooltip>
//                                 </ToggleButtonGroup>

//                             </Box>
//                             <Box display="flex" alignItems="center">
//                                 {/* filter icon */}
//                                 <FilterListIcon sx={{ fontSize: '35px' }}></FilterListIcon>
//                                 <FormControl sx={{ width: "200px", marginLeft: '10px' }} size="small">
//                                     <InputLabel >Year</InputLabel>
//                                     <Select label='Year' value={selectedYear}
//                                         onChange={(e) => setSelectedYear(e.target.value)}>
//                                         <MenuItem value="All">All</MenuItem>
//                                         {batchYear.map((year, index) => (
//                                             <MenuItem key={index} value={year}>{year}</MenuItem>
//                                         ))}


//                                     </Select>
//                                 </FormControl>

//                                 <FormControl sx={{ width: "100px", marginLeft: '10px' }} size="small">
//                                     <InputLabel >Sem</InputLabel>
//                                     <Select label='Sem' value={semester}
//                                         onChange={handleSemesterChange}>
//                                         <MenuItem value="All">All</MenuItem>
//                                         <MenuItem value="Odd">Odd</MenuItem>
//                                         <MenuItem value="Even">Even</MenuItem>
//                                     </Select>
//                                 </FormControl>

//                                 <Tooltip title="Export to Excel">
//                                     <span>
//                                         <IconButton
//                                             sx={{ marginLeft: "10px" }}
//                                             onClick={() => handleExport("excel")}
//                                             disabled={isExcelLoading} // Disable when loading
//                                         >
//                                             {isExcelLoading ? <CircularProgress size={24} /> : <RiFileExcel2Fill style={{ fontSize: "100%", color: "green" }} />}
//                                         </IconButton>
//                                     </span>
//                                 </Tooltip>

//                                 <Tooltip title="Export to JSON">
//                                     <span>
//                                         <IconButton
//                                             sx={{ marginLeft: "5px" }}
//                                             onClick={() => handleExport("json")}
//                                             disabled={isJsonLoading} // Disable when loading
//                                         >
//                                             {isJsonLoading ? <CircularProgress size={24} /> : <BsFiletypeJson style={{ fontSize: "100%", color: "green" }} />}
//                                         </IconButton>
//                                     </span>
//                                 </Tooltip>
//                             </Box>
//                         </Stack>
//                     )
//                 }



//                 <Stack direction='row' spacing={2} sx={{ color: 'white', width: { xs: '88%', md: '97%', lg: '96%', xl: '97%' }, height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
//                     <Box>
//                         {/* <img src={activityItemName.logo} alt="card logo" height='50px' /> */}
//                     </Box>
//                     <Box >
//                         {/* <Typography variant='h6' color='white'>{activityItemName.name}</Typography> */}
//                         <Typography variant='h6' color='white'>{isDynamic && isDynamic ? (dynamicTitle.title) : (activityItemName && activityItemName.name)}</Typography>
//                         <Typography sx={{ fontWeight: '100', fontSize: '12px' }}>{isDynamic && isDynamic ? (dynamicTitle.description) : (activityItemName && activityItemName.description)}</Typography>
//                     </Box>
//                 </Stack>

//                 {/* conditional rendering based on view type */}


//                 {viewType === "gallery" ? (<PhotoTimeline timelineImages={timelineImages} />) :
//                     (


//                         <TableComponent
//                             activity_item={activity_item}
//                             filteredData={filteredData}
//                             total={tableData.length}
//                             activity_name={activity_name}
//                             handleView={handleView}
//                             handleClickOpen={handleClickOpen}
//                             isDynamic={isDynamic}
//                             dynamicFields={dynamicFields}
//                         />






//                     )}




//             </Box>
//             {/* Snackbar */}
//             <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
//                 <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>{alert.message}
//                 </Alert>
//             </Snackbar>
//         </Paper>

//     )
// }

// export default activityTable




import {
    Paper, Box, Button,
    IconButton,
    Stack, Tooltip,
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem, Typography, CircularProgress,
    ToggleButton, ToggleButtonGroup
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from 'react'
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Close as CloseIcon } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { batchYear } from "../utils/forms"

import { routes } from "../utils/routes"
import { useParams, Link, useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import PhotoTimeline from './photoTimeline';

import Action from './Action';
import axios from "axios"
import { RiFileExcel2Fill } from "react-icons/ri";
import { BsFiletypeJson } from "react-icons/bs";
import FilterListIcon from '@mui/icons-material/FilterList';
import CollectionsIcon from '@mui/icons-material/Collections';
import TableRowsIcon from '@mui/icons-material/TableRows';
//even odd color for table row
import TableComponent from './tableComponent';
import { useIsMobile } from '../theme/theme';

import { useDispatch, useSelector } from 'react-redux';


function activityTable() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate(); // Add navigation hook

    // url format:-  /value_adition/patent
    const { activity_name, activity_item } = useParams();

    console.log("vbvba", activity_name, activity_item)

    const activityData = routes[activity_name]; // Get activity data based on route
    // If activityData    or activityName adata is undefined, show 404
    const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item

    const [isExcelLoading, setIsExcelLoading] = useState(false);
    const [isJsonLoading, setIsJsonLoading] = useState(false);

    const [viewType, setViewType] = useState('table')

    console.log("aaaaa", activityData, activityItemName)

    const [open, setOpen] = useState(false);

    const [tableData, setTableData] = useState([])
    const [filteredData, setFilteredData] = useState([]);

    const [semester, setSemester] = useState("All"); // State to hold selected semester
    const [selectedYear, setSelectedYear] = useState(batchYear[0]);
    const [selectedId, setSelectedId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [timelineImages, setTimelineImages] = useState([])

    const [isDynamic, setIsDynamic] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [dynamicTitle, setDynamicTitle] = useState({})

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
    const isMobile = useIsMobile();

    // Redirect to login if not logged in
    const redirectToLogin = () => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to your login route
            return true; // Return true to indicate redirection happened
        }
        return false; // Return false if no redirection needed
    };

    const handleSemesterChange = (event) => {
        // Redirect if not logged in
        if (redirectToLogin()) return;

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

    const handleView = (event, newView) => {
        // Redirect if not logged in and trying to view timeline
        if (newView === 'gallery' && !isLoggedIn) {
            redirectToLogin();
            return;
        }
        setViewType(newView);
    };

    const handleYearChange = (event) => {
        // Redirect if not logged in
        if (redirectToLogin()) return;

        setSelectedYear(event.target.value);
    };

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

    const handleExport = async (format) => {
        // Redirect if not logged in
        if (redirectToLogin()) return;

        // Set loading state based on format
        const setLoading = format === "excel" ? setIsExcelLoading : setIsJsonLoading;
        setLoading(true);

        try {
            const fileExtension = format === "excel" ? "xlsx" : "json";
            const fileName = `${activity_item}_${semester}_${selectedYear}_export.${fileExtension}`;
            const url = `/api/export/${format}/${activity_item}/${selectedYear}/${semester}`;

            console.log("Exporting from:", url);

            const response = await axios.get(url, {
                responseType: "blob",
                withCredentials: true
            });

            if (response.status === 200) {
                // Create file blob
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = fileURL;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(fileURL);

            } else if (response.status === 404) {
                throw new Error("No data found for the selected filters.");
            }
            else {
                throw new Error("Unexpected error occurred. Please try again.");
            }
        } catch (error) {
            console.log("Export Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTimelineData = async () => {
        try {

            if (isLoggedIn) {
                const response = await axios.get(`/api/get_photo_timeline/${activity_item}`, { withCredentials: true });
                console.log("Timeline: ", response.data)
                setTimelineImages(response.data.data)
            }

        }
        catch (error) {
            console.log("Error fetching timeline data:", error);
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

                //if data is dynamic
                setIsDynamic(response.data.isDynamic || false);
                if (response.data.isDynamic && response.data.fields) {
                    setDynamicFields(response.data.fields);
                    setDynamicTitle(response.data.name)
                }
            }
            console.log("Get Table Data: ", response.data)
        } catch (error) {
            console.log(error)
        }
    }

    //fetch data from the server
    useEffect(() => {
        get_table_data()
        getTimelineData();
    }, [selectedYear, activity_item])

    if (!activityData && !activityItemName && tableData.length === 0) {
        return (
            <ErrorPage />
        );
    }

    console.log("Table Data: ", tableData)
    console.log("Timeline Data: ", timelineImages)

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding:isMobile?'7px':activityDisplayInternalPadding , bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>

                {/* dialog box code */}
                {isLoggedIn && (
                    <Dialog
                        fullScreen={isMobile ? false : fullScreen}
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
                )}

                {/* toolbar for actions  */}
                {/*for mobile view */}
                {isMobile ?
                    (
                        <Stack direction='column' spacing={3} marginTop='10px' marginBottom='20px' alignContent="center" justifyContent="space-between" sx={{ bgcolor: 'white', padding: '8px 4px ', borderRadius: "10px" }}>
                            <Stack direction='row' spacing={3} alignItems="center" >

                                <Box >
                                    {/* if the form is hardcoded or dynamic */}
                                    {
                                        activityItemName ? (
                                            <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white', fontSize: '15px' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '16px', marginLeft: '5px' }} /></Button>
                                        ) : (
                                            <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 61)', color: 'white', fontSize: '15px' }} component={Link} to={`/${activity_name}/add_dynamic/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '16px', marginLeft: '5px' }} /></Button>
                                        )
                                    }
                                </Box>

                                {/* view toggle */}
                                <Box>
                                    <ToggleButtonGroup size='small' value={viewType}
                                        exclusive
                                        onChange={handleView}>
                                        <Tooltip title="List View">
                                            <ToggleButton value="table" aria-label="centered" >
                                                <TableRowsIcon sx={{ fontSize: '20px' }} />
                                            </ToggleButton>
                                        </Tooltip>
                                        <Tooltip title={isLoggedIn ? "Gallery" : "Login to view Gallery"}>
                                            <ToggleButton value="gallery" aria-label="centered">
                                                <CollectionsIcon sx={{ fontSize: '20px' }} />
                                            </ToggleButton>
                                        </Tooltip>
                                    </ToggleButtonGroup>
                                </Box>

                                <Box>
                                    <Tooltip title={isLoggedIn ? "Export to Excel" : "Login to Export"}>
                                        <span>
                                            <IconButton
                                                sx={{ marginLeft: "10px" }}
                                                onClick={() => handleExport("excel")}
                                                disabled={isExcelLoading} // Disable when loading
                                            >
                                                {isExcelLoading ? <CircularProgress size={24} /> : <RiFileExcel2Fill style={{ fontSize: "30px", color: "green" }} />}
                                            </IconButton>
                                        </span>
                                    </Tooltip>

                                    <Tooltip title={isLoggedIn ? "Export to JSON" : "Login to Export"}>
                                        <span>
                                            <IconButton
                                                sx={{ marginLeft: "5px" }}
                                                onClick={() => handleExport("json")}
                                                disabled={isJsonLoading} // Disable when loading
                                            >
                                                {isJsonLoading ? <CircularProgress size={24} /> : <BsFiletypeJson style={{ fontSize: "30px", color: "green" }} />}
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </Box>
                            </Stack>

                            <Box display="flex" alignItems="center" >
                                {/* filter icon */}
                                <FilterListIcon sx={{ fontSize: '35px' }}></FilterListIcon>
                                <Tooltip title={isLoggedIn ? "Select Year" : "Login to Filter"}>
                                    <FormControl sx={{ width: "200px", marginLeft: '10px' }} size="small">
                                        <InputLabel >Year</InputLabel>
                                        <Select label='Year' value={selectedYear}
                                            onChange={handleYearChange}>
                                            <MenuItem value="All">All</MenuItem>
                                            {batchYear.map((year, index) => (
                                                <MenuItem key={index} value={year}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Tooltip>

                                <Tooltip title={isLoggedIn ? "Select Semester" : "Login to Filter"}>
                                    <FormControl sx={{ width: "100px", marginLeft: '10px' }} size="small">
                                        <InputLabel >Sem</InputLabel>
                                        <Select label='Sem' value={semester}
                                            onChange={handleSemesterChange}>
                                            <MenuItem value="All">All</MenuItem>
                                            <MenuItem value="Odd">Odd</MenuItem>
                                            <MenuItem value="Even">Even</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Tooltip>
                            </Box>
                        </Stack>
                    ) : (
                        <Stack direction='row' spacing={1} marginTop='10px' marginBottom='5px' alignContent="center" justifyContent="space-between" sx={{ bgcolor: 'white', padding: '15px 10px ', borderRadius: "10px" }}>
                            <Box >
                                {/* if the form is hardcoded or dynamic */}
                                {
                                    activityItemName ? (
                                        <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 0)', color: 'white' }} component={Link} to={`/${activity_name}/add/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
                                    ) : (
                                        <Button variant='contianed' sx={{ bgcolor: 'rgb(0, 204, 61)', color: 'white' }} component={Link} to={`/${activity_name}/add_dynamic/${activity_item}`}>Add New<AddCircleOutlineIcon sx={{ fontSize: '20px', marginLeft: '5px' }} /></Button>
                                    )
                                }
                            </Box>

                            {/* view toggle */}
                            <Box>
                                <ToggleButtonGroup size='small' value={viewType}
                                    exclusive
                                    onChange={handleView}>
                                    <Tooltip title="List View">
                                        <ToggleButton value="table" aria-label="centered">
                                            <TableRowsIcon />
                                        </ToggleButton>
                                    </Tooltip>
                                    <Tooltip title={isLoggedIn ? "Gallery" : "Login to view Gallery"}>
                                        <ToggleButton value="gallery" aria-label="centered">
                                            <CollectionsIcon />
                                        </ToggleButton>
                                    </Tooltip>
                                </ToggleButtonGroup>
                            </Box>

                            <Box display="flex" alignItems="center">
                                {/* filter icon */}
                                <FilterListIcon sx={{ fontSize: '35px' }}></FilterListIcon>
                                <Tooltip title={isLoggedIn ? "Select Year" : "Login to Filter"}>
                                    <FormControl sx={{ width: "200px", marginLeft: '10px' }} size="small">
                                        <InputLabel >Year</InputLabel>
                                        <Select label='Year' value={selectedYear}
                                            onChange={handleYearChange}>
                                            <MenuItem value="All">All</MenuItem>
                                            {batchYear.map((year, index) => (
                                                <MenuItem key={index} value={year}>{year}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Tooltip>

                                <Tooltip title={isLoggedIn ? "Select Semester" : "Login to Filter"}>
                                    <FormControl sx={{ width: "100px", marginLeft: '10px' }} size="small">
                                        <InputLabel >Sem</InputLabel>
                                        <Select label='Sem' value={semester}
                                            onChange={handleSemesterChange}>
                                            <MenuItem value="All">All</MenuItem>
                                            <MenuItem value="Odd">Odd</MenuItem>
                                            <MenuItem value="Even">Even</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Tooltip>

                                <Tooltip title={isLoggedIn ? "Export to Excel" : "Login to Export"}>
                                    <span>
                                        <IconButton
                                            sx={{ marginLeft: "10px" }}
                                            onClick={() => handleExport("excel")}
                                            disabled={isExcelLoading} // Disable when loading
                                        >
                                            {isExcelLoading ? <CircularProgress size={24} /> : <RiFileExcel2Fill style={{ fontSize: "100%", color: "green" }} />}
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                <Tooltip title={isLoggedIn ? "Export to JSON" : "Login to Export"}>
                                    <span>
                                        <IconButton
                                            sx={{ marginLeft: "5px" }}
                                            onClick={() => handleExport("json")}
                                            disabled={isJsonLoading} // Disable when loading
                                        >
                                            {isJsonLoading ? <CircularProgress size={24} /> : <BsFiletypeJson style={{ fontSize: "100%", color: "green" }} />}
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Stack>
                    )
                }

                <Stack direction='row' spacing={2} sx={{ color: 'white', width: { xs: '88%', md: '97%', lg: '96%', xl: '97%' }, height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
                    <Box>
                        {/* <img src={activityItemName.logo} alt="card logo" height='50px' /> */}
                    </Box>
                    <Box >
                        <Typography variant='h6' color='white'>{isDynamic && isDynamic ? (dynamicTitle.title) : (activityItemName && activityItemName.name)}</Typography>
                        <Typography sx={{ fontWeight: '100', fontSize: '12px' }}>{isDynamic && isDynamic ? (dynamicTitle.description) : (activityItemName && activityItemName.description)}</Typography>
                    </Box>
                </Stack>

                {/* conditional rendering based on view type */}
                {viewType === "gallery" ? (
                    isLoggedIn ? <PhotoTimeline timelineImages={timelineImages} /> : null
                ) : (
                    <TableComponent
                        activity_item={activity_item}
                        filteredData={filteredData}
                        total={tableData.length}
                        activity_name={activity_name}
                        handleView={handleView}
                        handleClickOpen={handleClickOpen}
                        isDynamic={isDynamic}
                        dynamicFields={dynamicFields}
                        isLoggedIn={isLoggedIn} // Pass the login state to the table component
                    />
                )}
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