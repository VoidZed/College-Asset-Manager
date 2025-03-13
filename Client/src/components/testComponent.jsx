import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Divider, CircularProgress, Container, Paper } from '@mui/material';

// Sample image data with base64 placeholders
const samplePhotos = [
  {
    id: 1,
    url: "https://source.unsplash.com/random/800x600?nature",
    title: "Summer Hiking Trip",
    year: 2023
  },
  {
    id: 2,
    url: "https://source.unsplash.com/random/800x600?city",
    title: "City Exploration",
    year: 2023
  },
  {
    id: 3,
    url: "https://source.unsplash.com/random/800x600?beach",
    title: "Beach Vacation",
    year: 2023
  },
  {
    id: 4,
    url: "https://source.unsplash.com/random/800x600?mountains",
    title: "Mountain View",
    year: 2022
  },
  {
    id: 5,
    url: "https://source.unsplash.com/random/800x600?forest",
    title: "Forest Retreat",
    year: 2022
  },
  {
    id: 6,
    url: "https://source.unsplash.com/random/800x600?concert",
    title: "Live Concert",
    year: 2022
  },
  {
    id: 7,
    url: "https://source.unsplash.com/random/800x600?graduation",
    title: "Graduation Day",
    year: 2021
  },
  {
    id: 8,
    url: "https://source.unsplash.com/random/800x600?party",
    title: "New Year Party",
    year: 2021
  },
  {
    id: 9,
    url: "https://source.unsplash.com/random/800x600?travel",
    title: "European Tour",
    year: 2020
  },
  {
    id: 10,
    url: "https://source.unsplash.com/random/800x600?wedding",
    title: "Wedding Ceremony",
    year: 2020
  }
];

// LazyImage component to handle lazy loading of individual images
const LazyImage = ({ src, alt, year, title, height = 200 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <Paper 
      ref={imgRef} 
      elevation={3}
      sx={{ 
        height, 
        position: 'relative',
        mb: 1,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 8,
        }
      }}
    >
      {!isLoaded && (
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
          <CircularProgress size={30} />
        </Box>
      )}
      
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: isLoaded && !error ? 'block' : 'none'
            }}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
          />
          {error && (
            <Box 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.200',
                color: 'text.secondary'
              }}
            >
              <Typography variant="body2">Image unavailable</Typography>
            </Box>
          )}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              p: 1, 
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {title}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

// YearSection component for grouping photos by year
const YearSection = ({ year, photos, isVisible }) => {
  return (
    <Box sx={{ mb: 6 }}>
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
          {year}
        </Typography>
        <Divider sx={{ ml: 2, flex: 1 }} />
      </Box>
      
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <LazyImage
              src={photo.url}
              alt={photo.title}
              title={photo.title}
              year={year}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Main PhotoGalleryTimeline component
const PhotoGalleryTimeline = ({ photosData = samplePhotos }) => {
  const [visibleYears, setVisibleYears] = useState({});
  const yearRefs = useRef({});

  // Group photos by year
  const photosByYear = photosData.reduce((acc, photo) => {
    const year = photo.year || 'Unknown';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(photo);
    return acc;
  }, {});

  // Sort years in descending order (most recent first)
  const sortedYears = Object.keys(photosByYear).sort((a, b) => b - a);

  useEffect(() => {
    const observers = {};
    
    sortedYears.forEach(year => {
      if (yearRefs.current[year]) {
        observers[year] = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            setVisibleYears(prev => ({
              ...prev,
              [year]: entry.isIntersecting
            }));
          },
          { threshold: 0.1 }
        );
        
        observers[year].observe(yearRefs.current[year]);
      }
    });
    
    return () => {
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, [sortedYears]);
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Photo Timeline
        </Typography>
        
        {sortedYears.map(year => (
          <div ref={el => yearRefs.current[year] = el} key={year}>
            <YearSection 
              year={year} 
              photos={photosByYear[year]} 
              isVisible={visibleYears[year]}
            />
          </div>
        ))}
        
        {sortedYears.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 5 }}>
            No photos available.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

// Demo component to show the gallery with sample images
const PhotoGalleryDemo = () => {
  return <PhotoGalleryTimeline />;
};

export default PhotoGalleryDemo;










































// <Paper sx={{ width: "100%", margin: "10px auto", overflow: "hidden" }}>
// <TableContainer>
//     <Table>
//         {/* Table Header */}
//         <TableHead sx={{ bgcolor: "#2774AE" }}>
//             <TableRow >
//                 {table1stRow[activity_item] && table1stRow[activity_item].map((item, index) => (
//                     <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><Stack direction='row'><TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />{tableHead[item]}</Stack></TableCell>
//                 ))}
//                 {table1stRow[activity_item] && <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><Stack direction='row'><SettingsIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Actions</Stack></TableCell>
//                 }


//             </TableRow>
//         </TableHead>

//         {/* Table Body with Pagination */}
//         <TableBody>
//             {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                     <StyledTableRow key={index}>

//                         {table1stRow && table1stRow[activity_item].map((item, index) => {
//                             let value = row[item];
//                             // formated date 
//                             if (item === 'date' || item === 'start_date' || item === 'end_date') {
//                                 value = value.split("T")[0]
//                             }

//                             //display department values comma separated
//                             else if (item === 'department') {
//                                 value = value.join(" , ")
//                             }



//                             return (
//                                 <TableCell key={index} sx={{ textAlign: 'center' }}>
//                                     {value}
//                                 </TableCell>
//                             );
//                         })}



//                         <TableCell>
//                             <Stack direction="row">

//                                 <Tooltip title="View">  <Link to={`/${activity_name}/${activity_item}/${row._id}`} style={{ textDecoration: "none" }}><IconButton onClick={handleView}><RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon></IconButton></Link></Tooltip>
//                                 <Tooltip title="Edit">   <IconButton onClick={handleEdit}><EditIcon sx={{ color: editColor }}></EditIcon></IconButton></Tooltip>
//                                 <Tooltip title="Delete">   <IconButton onClick={() => handleClickOpen(row._id)} color='red'><DeleteSweepIcon sx={{ color: deleteColor }}
//                                 ></DeleteSweepIcon></IconButton></Tooltip>
//                             </Stack>
//                         </TableCell>


//                     </StyledTableRow>


//                 ))}
//         </TableBody>
//     </Table>
// </TableContainer>

// {/* Pagination Controls */}
// <TablePagination
//     rowsPerPageOptions={[5, 10, 15]}
//     component="div"
//     count={tableData.length}
//     rowsPerPage={rowsPerPage}
//     page={page}
//     onPageChange={handleChangePage}
//     onRowsPerPageChange={handleChangeRowsPerPage}
// />
// </Paper>