
// 3rd iteration

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Paper,
  Box,
  Chip,
  Typography,
  Stack,
  ImageList,
  ImageListItem,
  Grid,
  Card,
  CardMedia,
  Container,
  Divider,
  Tabs,
  Tab,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Badge,
  Skeleton,
  Fade
} from '@mui/material';
import { navbarColor, sidebarBgcolor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import TagIcon from '@mui/icons-material/Tag';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useParams } from 'react-router-dom';
import { routes } from "../utils/routes";
import ErrorPage from './ErrorPage';
import CardLogo from '../assets/imageLogo.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Action from './Action';
import axios from 'axios';
import { blogSide, tableHead } from '../utils/table';
import CloseIcon from '@mui/icons-material/Close';


function ActivityBlog() {
  // State for managing tabs
  const [tabValue, setTabValue] = useState(0);
  const [blogData, setBlogData] = useState({})
  const [selectedPdf, setSelectedPdf] = useState(blogData.reports && blogData.reports[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl); // Set the selected image URL
  };

  const handleClose = () => {
    setSelectedImage(null); // Close the modal
  };


  const [dataFetching, setDataFetching] = useState(false)

  // Get route parameters
  const { activity_name, activity_item, post_id } = useParams();

  console.log(activity_name, activity_item, post_id);

  // Get activity data based on route
  const activityData = routes[activity_name];
  const activityItemName = activityData?.activity?.[activity_item];

  // If data not found, show error page
  if (!activityData || !activityItemName) {
    return <ErrorPage />;
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };



  // Handle PDF selection
  const handlePdfSelect = (pdf) => {
    setSelectedPdf(pdf);
  };





  // function to get the post data from the backend 
  const getPostData = async () => {
    setDataFetching(true)
    try {
      const response = await axios.get(`/api/get-post/${activity_item}/${post_id}`, { withCredentials: true })
      if (response.status !== 200) {
        throw new Error("Could Not Get Post Data")
      }
      else if (response.status === 200) {
        console.log("Response Get Post:", response)
        setBlogData(response.data.data)
      }

    } catch (error) {
      console.log("Get Post Data Error: ", error)
    }
    finally {
      setDataFetching(false)
    }
  }

  // Clean up the image srcset function
  function cloudinarySrcset(cloudinaryId, maxSize = null, aspectRatio = null) {
    const baseUrl = "https://res.cloudinary.com/srmscet/image/upload";

    // For original size, just use f_auto and q_auto without resizing
    if (!maxSize) {
      const generateOriginalUrl = () =>
        `${baseUrl}/q_auto,f_auto/${cloudinaryId}`;

      return {
        src: generateOriginalUrl(),
        srcSet: `${generateOriginalUrl()} 1x, ${generateOriginalUrl()} 2x`
      };
    }

    // For specific size (backward compatibility)
    const width = maxSize;
    const height = aspectRatio ? Math.round(maxSize / aspectRatio) : null;

    const generateResizedUrl = () => {
      if (height) {
        return `${baseUrl}/w_${width},h_${height},c_fill,q_auto,f_auto/${cloudinaryId}`;
      }
      // If only width is provided
      return `${baseUrl}/w_${width},c_scale,q_auto,f_auto/${cloudinaryId}`;
    };

    return {
      src: generateResizedUrl(),
      srcSet: `${generateResizedUrl()} 1x, ${generateResizedUrl()} 2x`
    };
  }


  useEffect(() => {
    getPostData()
  }, [])

  console.log("Blog Side:",)
  console.log("State Data:", blogData)
  if (dataFetching) {
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
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
          <Skeleton variant="text" width="100%" height={50} />
        </Box>
      </Paper>
    )
  }

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

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Header section with gradient background */}
        <Card
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              p: 3,
              color: 'white',
              background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <img src={CardLogo} alt="card logo" height="50px" />
            </Box>

            <Stack direction="column" spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight="bold">
                {activityItemName.name}
                <Tooltip title="Verified Event">
                  <VerifiedIcon
                    color="info"
                    fontSize="small"
                    sx={{ ml: 1, verticalAlign: 'middle' }}
                  />
                </Tooltip>
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TagIcon fontSize="small" />
                <Typography variant="subtitle1">{blogData['title']}</Typography>
              </Stack>
            </Stack>

            <Tooltip title="Share Event">
              <IconButton
                sx={{ color: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' } }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Card>

        {/* Tabs for different sections */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 'medium',
                fontSize: '0.95rem',
                textTransform: 'none'
              }
            }}
          >
            <Tab icon={<DescriptionIcon fontSize="small" />} iconPosition="start" label="Event Details" />
            <Tab
              icon={<PictureAsPdfIcon fontSize="small" />}
              iconPosition="start"
              label="PDF Documents"
            />
          </Tabs>
        </Box>

        {/* Tab Panel 1: Event Details */}
        {tabValue === 0 && (
          <Fade in={tabValue === 0}>
            <Grid container spacing={4}>


              {/* Left column */}
              <Grid item xs={12} md={8}>
                {/* Date and creator info */}
                <Card elevation={2} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                          <CalendarTodayIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Start Date</Typography>

                          <Typography variant="body1" fontWeight="medium">  {(blogData.startDate && blogData.startDate.split('T')[0]) ||
                            (blogData.date && blogData.date.split('T')[0]) ||
                            "No date available"}</Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                          <CalendarTodayIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">End Date</Typography>
                          <Typography variant="body1" fontWeight="medium">  {(blogData.endDate && blogData.endDate.split('T')[0]) ||
                            (blogData.date && blogData.date.split('T')[0]) ||
                            "No date available"}</Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                          <PersonAddAltIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Created By</Typography>
                          <Typography variant="body1" fontWeight="medium">Dheerendra Vikram Dixit</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>





                {/* Media gallery */}
                <Card elevation={2} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="medium">Event Gallery</Typography>
                    <Chip
                      label={`${blogData.images && blogData.images.length} Photos`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>


                  <ImageList
                    variant="quilted"
                    cols={2}
                    gap={8}
                    rowHeight={180}
                    sx={{ m: 0, p: 1 }}
                  >
                    {blogData.images && blogData.images.map((item, index) => {



                      let imgUrl = item.url.split('upload/')[1]

                      return (
                        <ImageListItem
                          key={index}
                          cols={item.cols || 1}
                          rows={item.rows || 1}
                          sx={{
                            overflow: 'hidden',
                            borderRadius: 1,
                            '&:hover img': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' },
                            '&:hover .zoom-icon': { opacity: 1 }
                          }}
                          onClick={() => handleImageClick(item.url)}
                        >
                          <img
                            {...cloudinarySrcset(imgUrl, 300)}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transition: 'transform 0.3s ease-in-out'
                            }}
                          />

                          <Box
                            className="zoom-icon"
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease-in-out',
                              zIndex: 1,
                            }}
                          >
                            <IconButton sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                              <ZoomInIcon />
                            </IconButton>
                          </Box>
                        </ImageListItem>


                      )
                    })}
                  </ImageList>



                  {/* zoom model */}
                  <Dialog 
        open={Boolean(selectedImage)} 
        onClose={handleClose} 
        maxWidth="lg"
        TransitionComponent={Fade} // Smooth transition
        keepMounted // Prevent re-mounting issues
      >
        {selectedImage && ( // Prevent rendering an empty image
          <Box sx={{ position: 'relative' }}>
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* High-Quality Image */}
            <img
              src={`${selectedImage}?q_auto:best&w=1500`} // Load original quality
              alt="Zoomed Image"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        )}
      </Dialog>


                </Card>
              </Grid>

              {/* Right column - Event details */}
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Event Details</Typography>

                  <Stack spacing={2.5}>

                    {!dataFetching && blogSide[activity_item] && blogSide[activity_item].map((key, index) => {
                      let data = blogData[key]
                      if (key === 'department') {
                        data = (data || []).join(', ')
                      }


                      return (
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                            <PersonAddAltIcon fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" color="text.secondary">{tableHead[key]}</Typography>
                            <Typography variant="body1">{data}</Typography>
                          </Box>
                        </Stack>
                      )

                    })}




                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Fade>
        )}

        {/* Tab Panel 2: PDF Documents */}

        {tabValue === 1 && (
          <Fade in={tabValue === 1}>
            <Grid container spacing={4}>
              {/* Left column - PDF List */}
              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
                  <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="medium">Reports</Typography>
                  </Box>

                  <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>

                    {blogData.reports && blogData.reports.map((pdf, INDEX) => (


                      <Box
                        key={INDEX}
                        onClick={() => handlePdfSelect(pdf.url)}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          borderBottom: 1,
                          borderColor: 'divider',
                          bgcolor: selectedPdf === pdf ? 'action.selected' : 'background.paper',
                          '&:hover': { bgcolor: 'action.hover' },
                          transition: 'background-color 0.2s'
                        }}
                      >

                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <PictureAsPdfIcon color="error" fontSize="small" />
                          <Typography variant="body1" fontWeight="medium" noWrap>
                            {`PDF ${INDEX + 1}`}
                          </Typography>
                        </Stack>

                      </Box>

                    ))}


                  </Box>
                </Card>
              </Grid>

              {/* Right column - PDF Viewer */}
              <Grid item xs={12} md={8}>
                <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>


                  {/* PDF Viewer */}
                  <Box sx={{
                    height: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f5f5f5',

                    overflow: 'auto'
                  }}>
                    {/* This is a placeholder for a real PDF viewer component */}

                    <iframe
                      src={selectedPdf}
                      title="PDF Viewer"
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                    ></iframe>


                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Fade>


        )}
      </Container>
    </Paper>
  );
}

export default ActivityBlog;