

import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { sidebarBgcolor } from "../utils/color";
import { sidebarFontSize,sidebarCollapseFontSize } from "../utils/dimension";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // State to manage collapse sections
  const [openCollege, setOpenCollege] = useState(true);
  const [openTrust, setOpenTrust] = useState(false);

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: sidebarBgcolor,
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        color: "white",
        width: "250px",
      }}
    >
      <Stack direction="column" sx={{ padding: "10px 20px", marginTop: "10px" }}>

        {/* College Level Activities (Collapsible) */}
        <Button
          onClick={() => setOpenCollege(!openCollege)}
          sx={{
            justifyContent: "space-between",
            fontSize: sidebarCollapseFontSize,
            color: "inherit",
            width: "100%",
            textTransform: "none",
            fontWeight:"bold"
          }}
        >

          College Activities

          {openCollege ? <ExpandLess /> : <ExpandMore />}
        </Button>


        <Divider />
        
        <Collapse in={openCollege} timeout="auto" unmountOnExit>
        <Typography  sx={{ marginTop: "20px", fontWeight: "bold" ,marginLeft:"10px"}}>
            Cells
          </Typography>
          <Stack direction="column" spacing={1} mt={1} ml={2}>
            <SidebarButton to="/value_addition" label="Value Addition" isActive={isActive} />
            <SidebarButton to="/patent" label="Patent" isActive={isActive} />
            <SidebarButton to="/app_development" label="App Development" isActive={isActive} />
          </Stack>

          <Typography  sx={{ marginTop: "20px", fontWeight: "bold",marginLeft:"10px" }}>
            Clubs
          </Typography>
          <Divider />
          <Stack direction="column" spacing={1} mt={1} ml={2}>
            <SidebarButton to="/tyro" label="TYRO" isActive={isActive} />
            <SidebarButton to="/illuminati" label="Illuminati" isActive={isActive} />
            <SidebarButton to="/equinox" label="Equinox" isActive={isActive} />
          </Stack>
        </Collapse>

        {/* Trust Level Activities (Collapsible) */}
        <Button
          onClick={() => setOpenTrust(!openTrust)}
          sx={{
            justifyContent: "space-between",
            fontSize: sidebarCollapseFontSize,
            color: "inherit",
            width: "100%",
            textTransform: "none",
            marginTop: "20px",
            fontWeight:"bold"
          }}
        >
          
            Trust Activities
          
          {openTrust ? <ExpandLess /> : <ExpandMore />}
        </Button>
        <Divider />
        <Collapse in={openTrust} timeout="auto" unmountOnExit>
          <Stack direction="column" spacing={1} mt={1} ml={2}>
            <SidebarButton to="/trust_scholarship" label="Trust Scholarship" isActive={isActive} />
            <SidebarButton to="/national_awards" label="Convocation" isActive={isActive} />
            <SidebarButton to="/global_exposure" label="Global Exposure" isActive={isActive} />
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
}

// Reusable Sidebar Button Component
const SidebarButton = ({ to, label, isActive }) => (
  <Button
    to={to}
    component={Link}
    color="inherit"
    startIcon={<AddHomeIcon />}
    sx={{
      paddingLeft: "10px",
      justifyContent: "flex-start",
      fontSize: sidebarFontSize,
      bgcolor: isActive(to) ? "rgb(255, 255, 255)" : "transparent",
      color: isActive(to) ? "rgb(5,84,156)" : "inherit",
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

export default Sidebar;
