

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
  Container,
  Divider,
  Tabs,
  Tab,
  Avatar,
  IconButton,

  Skeleton,
  Fade
} from '@mui/material';
import { navbarColor } from '../utils/color';
import { activityDisplayInternalPadding } from '../utils/dimension';
import TagIcon from '@mui/icons-material/Tag';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useParams } from 'react-router-dom';
import { routes } from "../utils/routes";
import ErrorPage from './ErrorPage';
import CardLogo from '../assets/imageLogo.png';
import Action from './Action';
import axios from 'axios';
import { blogSide, tableHead } from '../utils/table';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';

function ActivityBlog() {
  // State for managing tabs
  const [tabValue, setTabValue] = useState(0);
  const [blogData, setBlogData] = useState({});
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [dataFetching, setDataFetching] = useState(false);

  // Get route parameters
  const { activity_name, activity_item, post_id } = useParams();

  console.log(activity_name, activity_item, post_id);

  // Get activity data based on route
  const activityData = routes[activity_name];
  const activityItemName = activityData?.activity?.[activity_item];

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle image click for zoom
  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  // Handle close for image modal
  const handleClose = () => {
    setSelectedImage(null);
  };

  // Handle PDF selection
  const handlePdfSelect = (pdf) => {
    setSelectedPdf(pdf);
  };

  // Function to get the post data from the backend
  const getPostData = async () => {
    setDataFetching(true);
    try {
      const response = await axios.get(`/api/get-post/${activity_item}/${post_id}`, { withCredentials: true });

      console.log("Raw API Response:", response);

      if (response.status !== 200) {
        throw new Error("Could Not Get Post Data");
      }

      console.log("Response Data:", response.data);
      console.log("Post Data:", response.data.data);

      // Set blog data
      setBlogData(response.data.data || {});

      // Store the entire response
      setResponse(response.data);

      // Initialize selected PDF if available
      if (response.data.data?.reports && response.data.data.reports.length > 0) {
        setSelectedPdf(response.data.data.reports[0].url);
      }

    } catch (error) {
      console.log("Get Post Data Error: ", error);
      setError(error.message || "Error fetching post data");
    } finally {
      setDataFetching(false);
    }
  };

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

  // Helper function to format field value for display
  const formatFieldValue = (value, type = null) => {
    if (value === undefined || value === null) return "N/A";

    // Format array values
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    // Format date values
    if (type === 'date' || (typeof value === 'string' && value.includes('T'))) {
      try {
        return value.split('T')[0];
      } catch (e) {
        return value;
      }
    }

    return value.toString();
  };

  // Function to find field info from the fields array
  const getFieldInfo = (fieldName) => {
    if (!response?.data?.fields) return null;
    return response.data.fields.find(field => field.name === fieldName);
  };

  useEffect(() => {
    getPostData();
  }, []);

  console.log("Blog Data:", blogData);

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
    );
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
              <Typography variant="h6" fontWeight="bold">
                {activityItemName?.name.toUpperCase() || activity_item.toUpperCase()}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TagIcon fontSize="small" />
                <Typography variant="subtitle2">{blogData['title']}</Typography>
              </Stack>
            </Stack>
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
              disabled={!blogData.reports || blogData.reports.length === 0}
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
                          <Typography variant="body1" fontWeight="medium">
                            {(blogData.start_date && blogData.start_date.split('T')[0]) ||
                              (blogData.date && blogData.date.split('T')[0]) ||
                              "No date available"}
                          </Typography>
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
                          <Typography variant="body1" fontWeight="medium">
                            {(blogData.end_date && blogData.end_date.split('T')[0]) ||
                              (blogData.date && blogData.date.split('T')[0]) ||
                              "No date available"}
                          </Typography>
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
                          <Typography variant="body1" fontWeight="medium">  {blogData.createdBy && blogData.createdBy.name ? blogData.createdBy.name : "No Name"}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>

                {/* Media gallery - only show if there are images */}

                <Card elevation={2} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="medium">Event Gallery</Typography>
                    <Chip
                      label={` Photos` || "0"}
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
                      let imgUrl = item.url.split('upload/')[1];

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
                            alt={item.title || `Image ${index + 1}`}
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
                      );
                    })}
                  </ImageList>

                  {/* Zoom modal for images */}
                  <Dialog
                    open={Boolean(selectedImage)}
                    onClose={handleClose}
                    maxWidth="lg"
                    TransitionComponent={Fade}
                    keepMounted
                  >
                    {selectedImage && (
                      <Box sx={{ position: 'relative' }}>
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

                        <img
                          src={`${selectedImage}?q_auto:best&w=1500`}
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
                    {/* Debug logs */}
                    {console.log("Blog Data for display:", blogData)}
                    {console.log("Response data:", response?.data)}

                    {/* Dynamic model data display */}


                    {/* Fallback for when no specific model type handling is available */}
                    {(!response?.data?.modelType || (!response?.data?.fields && !blogSide[activity_item])) && (
                      <>
                        {Object.entries(blogData).map(([key, value], index) => {
                          // Skip internal fields, images, and reports
                          if (key === 'images' || key === 'reports' || key === '_id' || key === '__v') return null;

                          const displayValue = formatFieldValue(value);

                          // Capitalize the first letter of the key for display
                          const displayKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

                          return (
                            <Stack key={index} direction="row" alignItems="center" spacing={2}>
                              <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36 }}>
                                <ArticleIcon fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body1">
                                  {displayKey}
                                </Typography>
                                <Typography variant="body2"  color="text.secondary">
                                  {displayValue}
                                </Typography>
                              </Box>
                            </Stack>
                          );
                        })}
                      </>
                    )}

                    {/* Show message if no data to display */}
                    {!Object.keys(blogData).length && (
                      <Typography color="text.secondary" align="center">No details available</Typography>
                    )}
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
                    {blogData.reports && blogData.reports.map((pdf, index) => (
                      <Box
                        key={index}
                        onClick={() => handlePdfSelect(pdf.url)}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          borderBottom: 1,
                          borderColor: 'divider',
                          bgcolor: selectedPdf === pdf.url ? 'action.selected' : 'background.paper',
                          '&:hover': { bgcolor: 'action.hover' },
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <PictureAsPdfIcon color="error" fontSize="small" />
                          <Typography variant="body1" fontWeight="medium" noWrap>
                            {pdf.title || `PDF ${index + 1}`}
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
                    {selectedPdf ? (
                      <iframe
                        src={selectedPdf}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                      ></iframe>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        Select a PDF to view
                      </Typography>
                    )}
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