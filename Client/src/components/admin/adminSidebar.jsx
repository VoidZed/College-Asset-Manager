import { Box, Button, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { sidebarBgcolorAdmin } from "../../utils/color"
import { sidebarCollapseFontSize, sidebarFontSize } from '../../utils/dimension';
import { Email } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
const AdminSidebar = () => {
    return (

        <Box
            sx={{
                height: "100%",
                bgcolor: sidebarBgcolorAdmin,
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                color: "white",
                width: "250px",
            }}
        >
            <Stack direction="column" sx={{ padding: "10px 20px", marginTop: "10px" }}>

                {/* College Level Activities (Collapsible) */}

                <Typography ml={2} variant="subtitle1" color="inherit" sx={{ marginBottom: '10px' }}>Admin</Typography>


                <Divider />


                <Stack direction="column" spacing={1} mt={1} ml={2}>
                    <SidebarButton to="/admin/email" label="Email" icon={<Email />} />
                    <SidebarButton to="/admin/users" label="Users" icon={<GroupIcon />} />

                    <SidebarButton to="/admin/addForm" label="Add Form" icon={<GroupIcon />} />
                    {/* <SidebarButton to="/admin/viewForm" label="View Form" icon={<GroupIcon />} /> */}
                    <SidebarButton to="/admin/listForm" label="List Form" icon={<GroupIcon />} />
                    
                </Stack>




            </Stack>
        </Box>
    );
}

// Reusable Sidebar Button Component
const SidebarButton = ({ to, label, icon }) => (
    <Button
        to={to}
        component={Link}
        color="inherit"
        startIcon={icon}
        sx={{
            paddingLeft: "10px",
            justifyContent: "flex-start",
            fontSize: sidebarFontSize,

            gap: 1,
            "&:hover": {
                bgcolor: "white",
                color: "rgb(5,84,156)",
            },
        }}
    >
        {label}
    </Button>
);
export default AdminSidebar;