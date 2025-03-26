import { Box, Button, Stack, Typography, Divider, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebarBgcolorAdmin } from "../../utils/color"
import { sidebarCollapseFontSize, sidebarFontSize } from '../../utils/dimension';
import { Email } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import AddCardIcon from '@mui/icons-material/AddCard';
import BallotIcon from '@mui/icons-material/Ballot';
import { useIsMobile } from '../../theme/theme';
const AdminSidebar = ({toggleDrawer}) => {
    const isMobile = useIsMobile();
    const [openSetting, setOpenSetting] = useState(true);
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

                <Button
                    onClick={() => setOpenSetting(!openSetting)}
                    sx={{
                        justifyContent: "space-between",
                        fontSize: sidebarCollapseFontSize,
                        color: "inherit",
                        width: "100%",
                        textTransform: "none",
                        marginTop: "20px",
                        fontWeight: "bold"
                    }}
                >

                    App Settings

                    {openSetting ? <ExpandLess /> : <ExpandMore />}
                </Button>


                <Divider />

                <Collapse in={openSetting} timeout="auto" unmountOnExit>
                    <Stack direction="column" spacing={1} mt={1} ml={2}>
                        <SidebarButton to="/admin/email" label="Email" icon={<Email />} />
                        <SidebarButton to="/admin/users" label="Users" icon={<GroupIcon />} />

                        <SidebarButton to="/admin/addForm" label="Add Form" icon={<AddCardIcon />} />
                        {/* <SidebarButton to="/admin/viewForm" label="View Form" icon={<GroupIcon />} /> */}
                        <SidebarButton to="/admin/listForm" label="List Form" icon={<BallotIcon />} />

                    </Stack>
                </Collapse>




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

