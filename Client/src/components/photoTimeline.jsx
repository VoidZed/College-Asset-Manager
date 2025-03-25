


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
    <Box sx={{ width: '95%',margin:'auto' }}>
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
                    bgcolor: '#faf7f7',
                    py: 1
                  }}
                >
                  <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>
                    {period._id}
                  </Typography>
                  <Divider sx={{ ml: 2, flex: 1 }} />
                </Box>
                
                <Grid container spacing={2}>
                  {period.urls.map((url, index) => {
                    const imageId = `${period._id}-${index}`;
                    
                    return (
                      <Grid item xs={6} sm={3} md={2} lg={2} key={imageId}>
                        <Paper 
                          ref={el => imageRefs.current[imageId] = el} 
                          elevation={1}
                          onClick={() => handleOpenDialog(url, period._id, index)}
                          sx={{ 
                            height: 180, 
                            width:180,
                            position: 'relative',
                            
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
            sx={{ background: 'linear-gradient(135deg, rgba(0, 204, 255, 0.2), rgba(0, 153, 255, 0.2))',    transition: "background 0.4s ease-in-out"}}
            maxWidth="lg"
            TransitionComponent={Zoom}
            PaperProps={{ sx: { overflow: 'hidden', maxHeight: '90vh', maxWidth: '90vw' } }}
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
                <Box sx={{ height: '100%', width: '100%', p: 2 ,position:'relative'}}>
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

