import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Button,
  Collapse,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { sidebarBgcolor } from "../utils/color";
import { sidebarFontSize, sidebarCollapseFontSize } from "../utils/dimension";
import BiotechIcon from '@mui/icons-material/Biotech';
import Groups3Icon from '@mui/icons-material/Groups3';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { useIsMobile } from '../theme/theme';
import CodeIcon from '@mui/icons-material/Code';


function Sidebar() {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);

  const isActive = (path) => location.pathname === path;

  // State to manage collapse sections
  const [openCollege, setOpenCollege] = useState(true);
  const [openTrust, setOpenTrust] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: sidebarBgcolor,
        color: "white",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        ...(isMobile
          ? {}
          : {
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          }),
      }}
    >
      {/* Main content area */}
      <Box sx={{ flex: 1, overflow: "auto" }}>
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
              fontWeight: "bold"
            }}
          >
            College Activities
            {openCollege ? <ExpandLess /> : <ExpandMore />}
          </Button>

          <Divider />

          <Collapse in={openCollege} timeout="auto" unmountOnExit>
            <Stack direction="column" spacing={1} mt={1} ml={2}>
              <SidebarButton to="/r&d_cell" label="R&D Cell" isActive={isActive} icon={<BiotechIcon />} />
              <SidebarButton to="/tyro" label="TYRO Club" isActive={isActive} icon={<Groups3Icon />} />
              <SidebarButton to="/other" label="Other" isActive={isActive} icon={<EditCalendarIcon />} />
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
              fontWeight: "bold"
            }}
          >
            Trust Activities
            {openTrust ? <ExpandLess /> : <ExpandMore />}
          </Button>
          
          <Divider />
          
          <Collapse in={openTrust} timeout="auto" unmountOnExit>
            <Stack direction="column" spacing={1} mt={1} ml={2}>
              <SidebarButton to="/trust/scholarship" label="Trust Scholarship" isActive={isActive} icon={<CurrencyRupeeIcon />} />
              <SidebarButton to="/trust/convocation" label="Convocation" isActive={isActive} icon={<SchoolIcon />} />
            </Stack>
          </Collapse>

          {/* Settings (Collapsible) */}
          {/* if the role is admin,principal show the settings button */}
          {role && ['admin', 'principal'].includes(role) && (
            <>
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
                Settings
                {openSetting ? <ExpandLess /> : <ExpandMore />}
              </Button>
              
              <Divider />
              
              <Collapse in={openSetting} timeout="auto" unmountOnExit>
                <Stack direction="column" spacing={1} mt={1} ml={2}>
                  <SidebarButton to="/admin" label="App Settings" isActive={isActive} icon={<SettingsIcon />} />
                </Stack>
              </Collapse>
            </>
          )}
        </Stack>
      </Box>

      {/* Fixed "Designed By" at bottom */}
      <Box 
        sx={{ 
          mt: "auto", 
          padding: "10px 20px",
          borderTop: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <SidebarButton to="/developer" label="Designed By" isActive={isActive} icon={<CodeIcon />} />
      </Box>
    </Box>
  );
}

// Reusable Sidebar Button Component
const SidebarButton = ({ to, label, isActive, icon }) => (
  <Button
    to={to}
    
    component={Link}
    color="inherit"
    startIcon={icon}
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