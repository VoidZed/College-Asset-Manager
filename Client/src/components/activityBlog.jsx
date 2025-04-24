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
  Fade,
  Tooltip
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
import CardLogo from '../assets/imageLogo.png';
import Action from './Action';
import axios from 'axios';
import { blogSide, tableHead } from '../utils/table';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import { useIsMobile } from '../theme/theme';

function ActivityBlog() {
  // State for managing tabs, data, and UI elements
  const [tabValue, setTabValue] = useState(0);
  const [blogData, setBlogData] = useState({});
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [dataFetching, setDataFetching] = useState(false);

  // Get route parameters
  const { activity_name, activity_item, post_id } = useParams();
  
  // Get activity data based on route
  const activityData = routes[activity_name];
  const activityItemName = activityData?.activity?.[activity_item];
  const isMobile = useIsMobile();

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
      
      if (response.status !== 200) {
        throw new Error("Could Not Get Post Data");
      }
      
      // Set blog data
      setBlogData(response.data.data || {});
      
      // Store the entire response
      setResponse(response.data);
      
      // Initialize selected PDF if available
      if (response.data.data?.reports && response.data.data.reports.length > 0) {
        setSelectedPdf(response.data.data.reports[0].url);
      }
      
    } catch (error) {
      console.error("Get Post Data Error: ", error);
      setError(error.message || "Error fetching post data");
    } finally {
      setDataFetching(false);
    }
  };

  // Clean up the image srcset function
  function cloudinarySrcset(cloudinaryId, maxSize = null, aspectRatio = null) {
    const baseUrl = "https://res.cloudinary.com/srmscet/image/upload";
    
    if (!maxSize) {
      const generateOriginalUrl = () =>
        `${baseUrl}/q_auto,f_auto/${cloudinaryId}`;
        
      return {
        src: generateOriginalUrl(),
        srcSet: `${generateOriginalUrl()} 1x, ${generateOriginalUrl()} 2x`
      };
    }
    
    const width = maxSize;
    const height = aspectRatio ? Math.round(maxSize / aspectRatio) : null;
    
    const generateResizedUrl = () => {
      if (height) {
        return `${baseUrl}/w_${width},h_${height},c_fill,q_auto,f_auto/${cloudinaryId}`;
      }
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

  useEffect(() => {
    getPostData();
  }, []);

  // Loading skeleton
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
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="80%" height={25} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Skeleton variant="rectangular" width="48%" height={80} />
            <Skeleton variant="rectangular" width="48%" height={80} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2 }}/>
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
      {/* Action buttons (back/forward) */}
      <Action />

      <Container maxWidth="lg" sx={{ py: 1 }}>
        {/* Header section with gradient background */}
        <Card
          elevation={2}
          sx={{
            mb: 2,
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: isMobile ? 2 : 2.5,
              color: 'white',
              background: 'linear-gradient(90deg, rgba(5,84,156,1) 15%, rgba(115,209,233,1) 94%, rgba(0,212,255,1) 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              <img src={CardLogo} alt="card logo" height={isMobile ? '30px' : '40px'} />
            </Box>

            <Stack direction="column" spacing={0.2} sx={{ flex: 1 }}>
              <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} fontWeight="bold">
                {activityItemName?.name.toUpperCase() || activity_item.toUpperCase()}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <TagIcon fontSize="small" />
                <Typography variant={isMobile ? 'caption' : 'body2'} sx={{ fontWeight: 500 }}>
                  {blogData['title']}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>

        {/* Tabs for different sections */}
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 'medium',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                textTransform: 'none',
                py: 1
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
            <Grid container spacing={2}>
              {/* Left column */}
              <Grid item xs={12} md={8}>
                {/* Date and creator info */}
                <Card elevation={1} sx={{ mb: 2, p: 1.5, borderRadius: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          <CalendarTodayIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Start Date</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {(blogData.start_date && blogData.start_date.split('T')[0]) ||
                              (blogData.date && blogData.date.split('T')[0]) ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          <CalendarTodayIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary">End Date</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {(blogData.end_date && blogData.end_date.split('T')[0]) ||
                              (blogData.date && blogData.date.split('T')[0]) ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                          <PersonAddAltIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Created By</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {blogData.createdBy && blogData.createdBy.name ? blogData.createdBy.name : "No Name"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>

                {/* Media gallery */}
                <Card elevation={1} sx={{ mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                  <Box sx={{ 
                    p: 1.5, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderBottom: blogData.images && blogData.images.length > 0 ? '1px solid #eee' : 'none' 
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ImageIcon fontSize="small" color="primary" />
                      <Typography variant="subtitle2" fontWeight="medium">Event Gallery</Typography>
                    </Stack>
                    
                    {blogData.images && blogData.images.length > 0 && (
                      <Chip
                        label={`${blogData.images.length} Photos`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box sx={{ p: 1 }}>
                    {blogData.images && blogData.images.length > 0 ? (
                      <ImageList
                        variant="quilted"
                        cols={isMobile ? 1 : 3}
                        gap={8}
                        rowHeight={120}
                      >
                        {blogData.images.map((item, index) => {
                          let imgUrl = item.url.split('upload/')[1];
                          
                          return (
                            <ImageListItem
                              key={index}
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
                                  objectFit: 'cover',
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
                                <IconButton size="small" sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                                  <ZoomInIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </ImageListItem>
                          );
                        })}
                      </ImageList>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '80px',
                          color: '#888',
                        }}
                      >
                        <Typography variant="body2">No photos available</Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Zoom modal for images */}
                  <Dialog
                    open={Boolean(selectedImage)}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
                    TransitionComponent={Fade}
                  >
                    {selectedImage && (
                      <Box sx={{ position: 'relative', bgcolor: 'black' }}>
                        <IconButton
                          onClick={handleClose}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
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
                          style={{ 
                            width: '100%', 
                            height: 'auto', 
                            maxHeight: '90vh', 
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto'
                          }}
                        />
                      </Box>
                    )}
                  </Dialog>
                </Card>
              </Grid>

              {/* Right column - Event details */}
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, borderBottom: '1px solid #eee', pb: 0.5 }}>
                    Event Details
                  </Typography>
                  
                  <Stack spacing={1.5}>
                    {Object.entries(blogData).map(([key, value], index) => {
                      // Skip internal fields, images, and reports
                      if (key === 'images' || key === 'reports' || key === '_id' || key === '__v' || 
                          key === 'createdBy' || key === 'date' || key === 'start_date' || key === 'end_date') return null;
                      
                      const displayValue = formatFieldValue(value);
                      
                      // Skip empty values
                      if (displayValue === "N/A" || displayValue === "") return null;
                      
                      // Capitalize the first letter of the key for display
                      const displayKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                      
                      return (
                        <Stack key={index} direction="row" alignItems="flex-start" spacing={1}>
                          <Avatar sx={{ bgcolor: 'primary.light', width: 28, height: 28 }}>
                            <ArticleIcon sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {displayKey}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                              {displayValue}
                            </Typography>
                          </Box>
                        </Stack>
                      );
                    })}
                    
                    {!Object.keys(blogData).filter(key => 
                      !['images', 'reports', '_id', '__v', 'createdBy', 'date', 'start_date', 'end_date'].includes(key)
                    ).length && (
                      <Typography color="text.secondary" align="center" variant="body2">
                        No additional details available
                      </Typography>
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
            <Grid container spacing={2}>
              {/* Left column - PDF List */}
              <Grid item xs={12} md={4}>
                <Card elevation={1} sx={{ borderRadius: 1, overflow: 'hidden', height: '100%' }}>
                  <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PictureAsPdfIcon color="error" fontSize="small" />
                    <Typography variant="subtitle2" fontWeight="medium">Available Reports</Typography>
                  </Box>
                  
                  <Box sx={{ maxHeight: isMobile ? 200 : 500, overflowY: 'auto' }}>
                    {blogData.reports && blogData.reports.map((pdf, index) => (
                      <Tooltip title={pdf.title || `PDF ${index + 1}`} key={index} placement="right">
                        <Box
                          onClick={() => handlePdfSelect(pdf.url)}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            bgcolor: selectedPdf === pdf.url ? 'action.selected' : 'background.paper',
                            '&:hover': { bgcolor: 'action.hover' },
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <PictureAsPdfIcon color="error" fontSize="small" />
                            <Typography variant="body2" fontWeight="medium" noWrap>
                              {pdf.title || `Report ${index + 1}`}
                            </Typography>
                          </Stack>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Card>
              </Grid>

              {/* Right column - PDF Viewer */}
              <Grid item xs={12} md={8}>
                <Card elevation={1} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                  <Box sx={{
                    height: isMobile ? 400 : 600,
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
                      <Typography variant="body2" color="text.secondary">
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