// import { Paper, Box, Chip, Typography, Stack, ImageList, ImageListItem } from '@mui/material'

// import React from 'react'
// import { navbarColor, sidebarBgcolor } from '../utils/color'

// import { activityDisplayInternalPadding } from '../utils/dimension'
// import TagIcon from '@mui/icons-material/Tag';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import { useParams } from 'react-router-dom';
// import { routes } from "../utils/routes"
// import ErrorPage from './ErrorPage';
// import CardLogo from '../assets/imageLogo.png'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Action from './Action';

// function srcset(image, size, rows = 1, cols = 1) {
//     return {
//         src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//         srcSet: `${image}?w=${size * cols}&h=${size * rows
//             }&fit=crop&auto=format&dpr=2 2x`,
//     };
// }
// const itemData = [
//     {
//         img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//         title: 'Breakfast',

//     },
//     {
//         img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//         title: 'Burger',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//         title: 'Camera',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//         title: 'Coffee',

//     }

// ];



// const boxWidth = "200px"


// function activityBlog() {



//     //get post from post id and display in the db
//     const { activity_name, activity_item, post_id } = useParams();




//     console.log(activity_name, activity_item, post_id);

//     const activityData = routes[activity_name]; // Get activity data based on route
//     // If activityData    or activityName adata is undefined, show 404
//     const activityItemName = activityData.activity[activity_item]; // Get activity item data based on route item

//     //if the url data is not found 
//     if (!activityData || !activityItemName) {
//         return (
//             //     <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: navbarColor }}>
//             //         <Typography variant="h5" color="error">404 Not Found</Typography>
//             //     </Paper>
//             <ErrorPage />
//         );
//     }


//     return (
//         <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
//             <Action></Action>
//             <Box sx={{ display: 'flex', flexDirection: 'column' }}>

//                 {/* Heading section */}
//                 {/* <Stack direction="row" sx={{ marginTop: '20px' }} alignItems="center">
//                     <Chip label={activityItemName.name} sx={{ color: 'white', padding: '20px', width: '200px', bgcolor: sidebarBgcolor, fontWeight: 'bold', fontSize: '15px', borderRadius: '5px' }} ></Chip>
//                     <TagIcon sx={{ color: 'green', margin: '0 5px' }}></TagIcon>
//                     <Typography variant='h6' sx={{ fontWeight: 'bold' }}>AI for Business</Typography>
//                 </Stack> */}
//                 <Stack direction='row' alignItems='center' spacing={2} sx={{ color: 'white', width: '97%', height: '50px', background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', marginTop: '20px', marginBottom: "15px", fontWeight: 'bold', fontSize: '15px', borderRadius: '5px', padding: "20px" }}>
//                     <Box>
//                         <img src={CardLogo} alt="card logo" height='50px' />
//                     </Box>
//                     <Stack direction='row' alignItems='center'>
//                         <Typography variant='h5' color='white'  sx={{ fontWeight: 'bold' }}>{activityItemName.name}</Typography>
//                         <ArrowForwardIosIcon fontSize='medium'></ArrowForwardIosIcon>
//                         <Typography variant='h6'>AI for Business</Typography>
//                     </Stack>
//                 </Stack>

//                 {/* date section */}

//                 <Stack direction="row" sx={{ marginTop: '10px' }} spacing={3} >
//                     <Typography variant='body2'>Start Date:- 29/07/2025</Typography>
//                     <Typography variant='body2'>End Date:-29/07/2025</Typography>
//                 </Stack>

//                 {/* created by section */}
//                 {/* <Typography variant='body2' sx={{marginTop:'5px'}} ><Stack direction='row' alignItems='center'><PersonAddAltIcon sx={{fontSize:"18px",marginRight:"5px"}}></PersonAddAltIcon><span style={{ fontWeight: 'bold',marginRight:'5px' }}>Created By:-</span> Dheerendra Vikram</Stack></Typography> */}
//                 <Stack direction='row' alignItems='center'>
//                     <PersonAddAltIcon />
//                     <Typography variant='body2'>
//                         <span style={{ fontWeight: 'bold', marginLeft: '5px' }}> Created By:-</span> Dheerendra Vikram Dixit
//                     </Typography>
//                 </Stack>



//                 {/* media section */}
//                 <Box sx={{ border: '1px solid lightgray', borderRadius: '10px', marginTop: '20px' }}>
//                     <ImageList
//                         sx={{ width: '100%' }}
//                         variant="quilted"
//                         cols={3}
//                         rowHeight={141}
//                     >
//                         {itemData.map((item) => (
//                             <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
//                                 <img
//                                     {...srcset(item.img, 720, item.rows, item.cols)}
//                                     alt={item.title}
//                                     loading="lazy"
//                                 />
//                             </ImageListItem>
//                         ))}
//                     </ImageList>
//                 </Box>




//                 {/* other data section */}


//                 <Box sx={{ border: '1px solid lightgray', marginTop: '20px', padding: '10px', borderRadius: '10px' }}>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         {/* <Box sx={{width:boxWidth}}><Typography>Speaker Name</Typography></Box> */}
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Speaker Name" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>Mr. Amit Verma</Typography></Box>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Speaker Organisation" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>Google</Typography></Box>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Total Students" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>120</Typography></Box>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Batch" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>2021-2022</Typography></Box>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Mode" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>Offline</Typography></Box>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
//                         <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Department" sx={{ borderRadius: '7px' }}></Chip></Box>
//                         <Box><Typography variant='body2'>CSE , IT</Typography></Box>
//                     </Stack>
//                 </Box>

//                 <Box sx={{ marginBottom: '40px' }}></Box>

//             </Box>
//         </Paper>
//     )
// }

// export default activityBlog






// 2nd iteration




// import React from 'react';
// import { 
//   Paper, 
//   Box, 
//   Chip, 
//   Typography, 
//   Stack, 
//   ImageList, 
//   ImageListItem,
//   Grid,
//   Card,
//   CardMedia,
//   Container,
//   Divider
// } from '@mui/material';
// import { navbarColor, sidebarBgcolor } from '../utils/color';
// import { activityDisplayInternalPadding } from '../utils/dimension';
// import TagIcon from '@mui/icons-material/Tag';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import BusinessIcon from '@mui/icons-material/Business';
// import GroupIcon from '@mui/icons-material/Group';
// import SchoolIcon from '@mui/icons-material/School';
// import ComputerIcon from '@mui/icons-material/Computer';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { useParams } from 'react-router-dom';
// import { routes } from "../utils/routes";
// import ErrorPage from './ErrorPage';
// import CardLogo from '../assets/imageLogo.png';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Action from './Action';

// // Clean up the image srcset function
// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

// // Sample image data
// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     cols: 1,
//     rows: 1,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     cols: 1,
//     rows: 1,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     cols: 1,
//     rows: 1,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     cols: 1,
//     rows: 1,
//   }
// ];

// function ActivityBlog() {
//   // Get route parameters
//   const { activity_name, activity_item, post_id } = useParams();
  
//   console.log(activity_name, activity_item, post_id);

//   // Get activity data based on route
//   const activityData = routes[activity_name];
//   const activityItemName = activityData?.activity?.[activity_item];

//   // If data not found, show error page
//   if (!activityData || !activityItemName) {
//     return <ErrorPage />;
//   }

//   return (
//     <Paper 
//       elevation={0}
//       sx={{ 
//         height: '100%', 
//         overflowY: 'auto', 
//         padding: activityDisplayInternalPadding, 
//         bgcolor: navbarColor, 
//         borderTopLeftRadius: "20px",
//         borderBottomLeftRadius: "20px",
//       }}
//     >
//       <Action />
      
//       <Container maxWidth="lg" sx={{ py: 2 }}>
//         {/* Header section with gradient background */}
//         <Card 
//           elevation={3} 
//           sx={{ 
//             mb: 4, 
//             borderRadius: 2, 
//             overflow: 'hidden',
//           }}
//         >
//           <Box 
//             sx={{ 
//               p: 3, 
//               color: 'white', 
//               background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)', 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: 2 
//             }}
//           >
//             <Box sx={{ flexShrink: 0 }}>
//               <img src={CardLogo} alt="card logo" height="50px" />
//             </Box>
            
//             <Stack direction="column" spacing={0.5}>
//               <Typography variant="h5" fontWeight="bold">{activityItemName.name}</Typography>
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <TagIcon fontSize="small" />
//                 <Typography variant="subtitle1">AI for Business</Typography>
//               </Stack>
//             </Stack>
//           </Box>
//         </Card>

//         {/* Event information section */}
//         <Grid container spacing={4}>
//           {/* Left column */}
//           <Grid item xs={12} md={8}>
//             {/* Date and creator info */}
//             <Card elevation={2} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <CalendarTodayIcon color="primary" />
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">Start Date</Typography>
//                       <Typography variant="body1" fontWeight="medium">29/07/2025</Typography>
//                     </Box>
//                   </Stack>
//                 </Grid>
                
//                 <Grid item xs={12} sm={6}>
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <CalendarTodayIcon color="primary" />
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">End Date</Typography>
//                       <Typography variant="body1" fontWeight="medium">29/07/2025</Typography>
//                     </Box>
//                   </Stack>
//                 </Grid>
                
//                 <Grid item xs={12}>
//                   <Divider sx={{ my: 1 }} />
//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <PersonAddAltIcon color="primary" />
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">Created By</Typography>
//                       <Typography variant="body1" fontWeight="medium">Dheerendra Vikram Dixit</Typography>
//                     </Box>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </Card>

//             {/* Media gallery */}
//             <Card elevation={2} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
//               <Box sx={{ p: 2 }}>
//                 <Typography variant="h6" fontWeight="medium">Event Gallery</Typography>
//               </Box>
//               <ImageList
//                 variant="quilted"
//                 cols={2}
//                 rowHeight={180}
//                 sx={{ m: 0 }}
//               >
//                 {itemData.map((item) => (
//                   <ImageListItem 
//                     key={item.img} 
//                     cols={item.cols || 1} 
//                     rows={item.rows || 1}
//                     sx={{ overflow: 'hidden', '&:hover img': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' } }}
//                   >
//                     <img
//                       {...srcset(item.img, 500, item.rows, item.cols)}
//                       alt={item.title}
//                       loading="lazy"
//                       style={{ transition: 'transform 0.3s ease-in-out' }}
//                     />
//                   </ImageListItem>
//                 ))}
//               </ImageList>
//             </Card>
//           </Grid>

//           {/* Right column - Event details */}
//           <Grid item xs={12} md={4}>
//             <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Event Details</Typography>
              
//               <Stack spacing={2.5}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <PersonAddAltIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Speaker Name</Typography>
//                     <Typography variant="body1">Mr. Amit Verma</Typography>
//                   </Box>
//                 </Stack>
                
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <BusinessIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Speaker Organisation</Typography>
//                     <Typography variant="body1">Google</Typography>
//                   </Box>
//                 </Stack>
                
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <GroupIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Total Students</Typography>
//                     <Typography variant="body1">120</Typography>
//                   </Box>
//                 </Stack>
                
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <SchoolIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Batch</Typography>
//                     <Typography variant="body1">2021-2022</Typography>
//                   </Box>
//                 </Stack>
                
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <LocationOnIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Mode</Typography>
//                     <Typography variant="body1">Offline</Typography>
//                   </Box>
//                 </Stack>
                
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <ComputerIcon color="primary" />
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">Department</Typography>
//                     <Typography variant="body1">CSE, IT</Typography>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Paper>
//   );
// }

// export default ActivityBlog;