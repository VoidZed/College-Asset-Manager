import React from 'react'
import Navbar from "../../components/navbar"
import Sidebar from "./adminSidebar"

import { Box, Stack } from '@mui/material';
import { activityDisplayPadding } from '../../utils/dimension';

import { Outlet } from 'react-router-dom';


function activitySelection() {
    return (

        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
            <Navbar></Navbar>

            {/* <Stack direction='row' sx={{ flex: 1 }}> */}
            <Stack direction='row' sx={{ flex: 1, overflowY: 'hidden' }}>
                <Box sx={{}}>
                    <Sidebar></Sidebar>
                </Box>

                {/* <Box sx={{ padding: '10px' }} > */}
                <Box sx={{ padding: activityDisplayPadding, flex: 1, height: '100%' }}>


                    <Outlet></Outlet>
                </Box>
            </Stack>
        </Box>
    )
}


export default activitySelection

