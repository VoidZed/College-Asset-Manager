import { Paper, Box, Chip, Typography, Stack, ImageList, ImageListItem } from '@mui/material'

import React from 'react'
import { navbarColor, sidebarBgcolor } from '../utils/color'

import { activityDisplayInternalPadding } from '../utils/dimension'
import TagIcon from '@mui/icons-material/Tag';
import EastIcon from '@mui/icons-material/East';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',

    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',

    }

];



const boxWidth = "200px"


function activityBlog() {
    return (
        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                {/* Heading section */}
                <Stack direction="row" sx={{ marginTop: '20px' }} alignItems="center">
                    <Chip label="Guest Lecture" sx={{ color: 'white', padding: '20px', width: '200px', bgcolor: sidebarBgcolor, fontWeight: 'bold', fontSize: '15px', borderRadius: '5px' }} ></Chip>
                    <TagIcon sx={{ color: 'green' }}></TagIcon>
                    <Typography variant='h6'>AI for Business</Typography>
                </Stack>

                {/* date section */}

                <Stack direction="row" sx={{ marginTop: '20px' }} spacing={3} >
                    <Typography variant='body2'>Start Date:- 29/07/2025</Typography>
                    <Typography variant='body2'>End Date:-29/07/2025</Typography>
                </Stack>

                {/* created by section */}
                <Typography variant='body2'><span style={{ fontWeight: 'bold' }}>Created By:-</span> Dheerendra Vikram</Typography>



                {/* media section */}
                <Box sx={{ border: '1px solid lightgray', borderRadius: '10px', marginTop: '20px' }}>
                    <ImageList
                        sx={{ width: '100%' }}
                        variant="quilted"
                        cols={3}
                        rowHeight={141}
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 720, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>


                {/* other data section */}


                <Box sx={{ border: '1px solid lightgray', marginTop: '20px', padding: '10px', borderRadius: '10px' }}>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        {/* <Box sx={{width:boxWidth}}><Typography>Speaker Name</Typography></Box> */}
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Speaker Name" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>Mr. Amit Verma</Typography></Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Speaker Organisation" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>Google</Typography></Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Total Students" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>120</Typography></Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Batch" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>2021-2022</Typography></Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Mode" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>Offline</Typography></Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
                        <Box sx={{ width: boxWidth }}><Chip size="medium" variant="outlined" label="Department" sx={{ borderRadius: '7px' }}></Chip></Box>
                        <Box><Typography variant='body2'>CSE , IT</Typography></Box>
                    </Stack>
                </Box>

                <Box sx={{ marginBottom: '40px' }}></Box>

            </Box>
        </Paper>
    )
}

export default activityBlog