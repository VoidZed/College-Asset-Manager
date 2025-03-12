// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid,
//   Divider, 
//   CircularProgress, 
//   Paper, 
//   Fade,
//   Dialog,
//   IconButton,
//   Zoom,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ZoomInIcon from '@mui/icons-material/ZoomIn';

// const PhotoTimeline = ({ timelineImages }) => {
//   const [loadedImages, setLoadedImages] = useState({});
//   const [inViewImages, setInViewImages] = useState({});
//   const [errorImages, setErrorImages] = useState({});
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
  
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
//   const imageRefs = useRef({});
//   const yearRefs = useRef({});

//   // Ensure timelineImages is always an array
//   const timelineData = Array.isArray(timelineImages) ? timelineImages : [];

//   // Sort periods in descending order (most recent first)
//   const sortedTimeline = [...timelineData].sort((a, b) => {
//     // Extract the first year from the period (e.g., "2024" from "2024-2025")
//     const yearA = a._id.split('-')[0];
//     const yearB = b._id.split('-')[0];
//     return parseInt(yearB) - parseInt(yearA);
//   });

//   useEffect(() => {
//     const imageObservers = {};
    
//     // Create observers for images
//     Object.keys(imageRefs.current).forEach(imageId => {
//       if (imageRefs.current[imageId]) {
//         imageObservers[imageId] = new IntersectionObserver(
//           (entries) => {
//             const [entry] = entries;
//             if (entry.isIntersecting) {
//               setInViewImages(prev => ({
//                 ...prev,
//                 [imageId]: true
//               }));
//               imageObservers[imageId].disconnect();
//             }
//           },
//           { threshold: 0.1 }
//         );
        
//         imageObservers[imageId].observe(imageRefs.current[imageId]);
//       }
//     });
    
//     return () => {
//       Object.values(imageObservers).forEach(observer => {
//         observer.disconnect();
//       });
//     };
//   }, [sortedTimeline]);

//   const handleImageLoad = (imageId) => {
//     setLoadedImages(prev => ({
//       ...prev,
//       [imageId]: true
//     }));
//   };

//   const handleImageError = (imageId) => {
//     setErrorImages(prev => ({
//       ...prev,
//       [imageId]: true
//     }));
//     setLoadedImages(prev => ({
//       ...prev,
//       [imageId]: true
//     }));
//   };
  
//   const handleOpenDialog = (url, period, index) => {
//     setSelectedImage({
//       url,
//       period,
//       index
//     });
//     setDialogOpen(true);
//   };
  
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };
  
//   // Function to transform Cloudinary URL to low quality
//   const getLowQualityUrl = (url) => {
//     if (!url.includes('cloudinary.com')) return url;
    
//     // Insert quality transformation
//     return url.replace(/\/upload\//, '/upload/q_auto:low,f_auto/');
//   };
  
//   // Function to get high quality URL for the dialog
//   const getHighQualityUrl = (url) => {
//     if (!url.includes('cloudinary.com')) return url;
    
//     // Insert high quality transformation
//     return url.replace(/\/upload\//, '/upload/q_auto:good,f_auto/');
//   };
  
//   return (
//     <Box sx={{ width: '100%' }}>
//       {sortedTimeline.length === 0 ? (
//         <Typography variant="body1" sx={{ textAlign: 'center', py: 5 }}>
//           No timeline data available.
//         </Typography>
//       ) : (
//         <>
//           {sortedTimeline.map(period => (
//             <Fade in key={period._id} timeout={800}>
//               <Box 
//                 ref={el => yearRefs.current[period._id] = el}
//                 sx={{ mb: 6 }}
//                 id={period._id}
//               >
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     mb: 2,
//                     position: 'sticky',
//                     top: 0,
//                     zIndex: 10,
//                     bgcolor: 'background.paper',
//                     py: 1
//                   }}
//                 >
//                   <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
//                     {period._id}
//                   </Typography>
//                   <Divider sx={{ ml: 2, flex: 1 }} />
//                 </Box>
                
//                 <Grid container spacing={2}>
//                   {period.urls.map((url, index) => {
//                     const imageId = `${period._id}-${index}`;
                    
//                     return (
//                       <Grid item xs={12} sm={6} md={4} lg={3} key={imageId}>
//                         <Paper 
//                           ref={el => imageRefs.current[imageId] = el} 
//                           elevation={3}
//                           onClick={() => handleOpenDialog(url, period._id, index)}
//                           sx={{ 
//                             height: 240, 
//                             position: 'relative',
//                             borderRadius: 2,
//                             overflow: 'hidden',
//                             transition: 'transform 0.3s, box-shadow 0.3s',
//                             cursor: 'pointer',
//                             '&:hover': {
//                               transform: 'scale(1.03)',
//                               boxShadow: 6,
//                               '& .zoom-icon': {
//                                 opacity: 1,
//                               }
//                             }
//                           }}
//                         >
//                           {!loadedImages[imageId] && (
//                             <Box 
//                               sx={{ 
//                                 position: 'absolute', 
//                                 top: 0, 
//                                 left: 0, 
//                                 right: 0, 
//                                 bottom: 0, 
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 bgcolor: 'rgba(0,0,0,0.05)'
//                               }}
//                             >
//                               <CircularProgress size={30} color="primary" />
//                             </Box>
//                           )}
                          
//                           {inViewImages[imageId] && (
//                             <>
//                               <img
//                                 src={getLowQualityUrl(url)}
//                                 alt={`Image from ${period._id}`}
//                                 style={{
//                                   width: '100%',
//                                   height: '100%',
//                                   objectFit: 'cover',
//                                   display: loadedImages[imageId] && !errorImages[imageId] ? 'block' : 'none'
//                                 }}
//                                 onLoad={() => handleImageLoad(imageId)}
//                                 onError={() => handleImageError(imageId)}
//                               />
//                               {errorImages[imageId] && (
//                                 <Box 
//                                   sx={{ 
//                                     height: '100%', 
//                                     display: 'flex', 
//                                     alignItems: 'center', 
//                                     justifyContent: 'center',
//                                     bgcolor: 'grey.200',
//                                     color: 'text.secondary'
//                                   }}
//                                 >
//                                   <Typography variant="body2">Image unavailable</Typography>
//                                 </Box>
//                               )}
//                               <Box 
//                                 className="zoom-icon"
//                                 sx={{ 
//                                   position: 'absolute', 
//                                   top: '50%',
//                                   left: '50%',
//                                   transform: 'translate(-50%, -50%)',
//                                   bgcolor: 'rgba(0,0,0,0.5)',
//                                   borderRadius: '50%',
//                                   p: 1,
//                                   opacity: 0,
//                                   transition: 'opacity 0.3s'
//                                 }}
//                               >
//                                 <ZoomInIcon sx={{ color: 'white', fontSize: 32 }} />
//                               </Box>
//                             </>
//                           )}
//                         </Paper>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//               </Box>
//             </Fade>
//           ))}
          
//           {/* Image Dialog */}
//           <Dialog
//             open={dialogOpen}
//             onClose={handleCloseDialog}
//             fullScreen={fullScreen}
//             maxWidth="lg"
//             TransitionComponent={Zoom}
//             PaperProps={{
//               sx: {
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 position: 'relative',
//                 maxHeight: '90vh',
//                 maxWidth: '90vw',
//               }
//             }}
//           >
//             {selectedImage && (
//               <>
//                 <IconButton
//                   onClick={handleCloseDialog}
//                   sx={{
//                     position: 'absolute',
//                     right: 8,
//                     top: 8,
//                     bgcolor: 'rgba(0,0,0,0.6)',
//                     zIndex: 10,
//                     color: 'white',
//                     '&:hover': {
//                       bgcolor: 'rgba(0,0,0,0.8)',
//                     }
//                   }}
//                 >
//                   <CloseIcon />
//                 </IconButton>
//                 <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
//                   <img 
//                     src={getHighQualityUrl(selectedImage.url)}
//                     alt={`Full size image from ${selectedImage.period}`}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'contain',
//                       backgroundColor: '#000',
//                       display: 'block'
//                     }}
//                   />
//                 </Box>
//               </>
//             )}
//           </Dialog>
//         </>
//       )}
//     </Box>
//   );
// };

// export default PhotoTimeline;



import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Divider, 
  CircularProgress, 
  Paper, 
  Fade,
  Dialog,
  IconButton,
  Zoom,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const PhotoTimeline = ({ timelineImages }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [inViewImages, setInViewImages] = useState({});
  const [errorImages, setErrorImages] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const imageRefs = useRef({});
  const yearRefs = useRef({});

  const timelineData = Array.isArray(timelineImages) ? timelineImages : [];

  // Sort periods in descending order (most recent first)
  const sortedTimeline = [...timelineData].sort((a, b) => {
    const yearA = a._id.split('-')[0];
    const yearB = b._id.split('-')[0];
    return parseInt(yearB) - parseInt(yearA);
  });

  useEffect(() => {
    const imageObservers = {};
    
    Object.keys(imageRefs.current).forEach(imageId => {
      if (imageRefs.current[imageId]) {
        imageObservers[imageId] = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              setInViewImages(prev => ({
                ...prev,
                [imageId]: true
              }));
              imageObservers[imageId].disconnect();
            }
          },
          { threshold: 0.1 }
        );
        
        imageObservers[imageId].observe(imageRefs.current[imageId]);
      }
    });

    return () => {
      Object.values(imageObservers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, [sortedTimeline]);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  const handleImageError = (imageId) => {
    setErrorImages(prev => ({
      ...prev,
      [imageId]: true
    }));
    setLoadedImages(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  const handleOpenDialog = (url, period, index) => {
    setSelectedImage({ url, period, index });
    setImageLoaded(false); // Reset image load state for new image
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getLowQualityUrl = (url) => {
    if (!url.includes('cloudinary.com')) return url;
    return url.replace(/\/upload\//, '/upload/q_auto:low,f_auto/');
  };

  const getHighQualityUrl = (url) => {
    if (!url.includes('cloudinary.com')) return url;
    return url.replace(/\/upload\//, '/upload/q_auto:good,f_auto/');
  };

  return (
    <Box sx={{ width: '100%' }}>
      {sortedTimeline.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 5 }}>
          No timeline data available.
        </Typography>
      ) : (
        <>
          {sortedTimeline.map(period => (
            <Fade in key={period._id} timeout={800}>
              <Box ref={el => yearRefs.current[period._id] = el} sx={{ mb: 6 }} id={period._id}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    bgcolor: 'background.paper',
                    py: 1
                  }}
                >
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    {period._id}
                  </Typography>
                  <Divider sx={{ ml: 2, flex: 1 }} />
                </Box>
                
                <Grid container spacing={2}>
                  {period.urls.map((url, index) => {
                    const imageId = `${period._id}-${index}`;
                    
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={imageId}>
                        <Paper 
                          ref={el => imageRefs.current[imageId] = el} 
                          elevation={3}
                          onClick={() => handleOpenDialog(url, period._id, index)}
                          sx={{ 
                            height: 240, 
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scale(1.03)',
                              boxShadow: 6,
                              '& .zoom-icon': { opacity: 1 },
                            }
                          }}
                        >
                          {!loadedImages[imageId] && (
                            <Box 
                              sx={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(0,0,0,0.05)'
                              }}
                            >
                              <CircularProgress size={30} color="primary" />
                            </Box>
                          )}

                          {inViewImages[imageId] && (
                            <>
                              <img
                                src={getLowQualityUrl(url)}
                                alt={`Image from ${period._id}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: loadedImages[imageId] ? 'block' : 'none' }}
                                onLoad={() => handleImageLoad(imageId)}
                                onError={() => handleImageError(imageId)}
                              />
                            </>
                          )}
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Fade>
          ))}
          
          {/* Image Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            fullScreen={fullScreen}
            maxWidth="lg"
            TransitionComponent={Zoom}
            PaperProps={{ sx: { borderRadius: 2, overflow: 'hidden', maxHeight: '90vh', maxWidth: '90vw' } }}
          >
            {selectedImage && (
              <>
                {/* Close Button (only appears after image loads) */}
                {imageLoaded && (
                  <IconButton
                    onClick={handleCloseDialog}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      zIndex: 10,
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}

                {/* Image Display with Loading Spinner */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', p: 2 }}>
                  <img 
                    src={getHighQualityUrl(selectedImage.url)} 
                    alt="Full size" 
                    style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', display: imageLoaded ? 'block' : 'none' }} 
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && <CircularProgress size={40} color="primary" />}
                </Box>
              </>
            )}
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default PhotoTimeline;

