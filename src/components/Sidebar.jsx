import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Sidebar = ({ sidebarOpen, handleSidebarToggle, setCurrentPage }) => {
  const menuItems = [
    { label: "News Feed", icon: <HomeIcon />, page: "newsfeed" },
    { label: "Profile", icon: <PersonIcon />, page: "profile" },
    { label: "Settings", icon: <SettingsIcon />, page: "settings" },
  ];

  return (
    <Box
      sx={{
        width: sidebarOpen ? 240 : 64,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(45deg, #1c1c1c, #333333)",
        color: "white",
        transition: "width 0.3s",
      }}
    >
      {/* Menu Items */}
      <Box sx={{ flexGrow: 1, marginTop: "70px" }}>
        <List>
          {menuItems.map(({ label, icon, page }) => (
            <Tooltip key={label} title={label} placement="right" disableHoverListener={!sidebarOpen}>
              <ListItem button onClick={() => setCurrentPage(page)}>
                <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                {sidebarOpen && <ListItemText primary={label} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: "#444" }} />

      {/* Chevron Icon at the bottom */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <IconButton onClick={handleSidebarToggle} sx={{ color: "white" }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
