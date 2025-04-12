"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

export function Sidebar() {
  const navItems = [
    { icon: <DashboardIcon fontSize="small" />, label: "Dashboard", badge: null, active: false },
    { icon: <ShoppingBagIcon fontSize="small" />, label: "Orders", badge: "14", active: false },
    { icon: <Inventory2Icon fontSize="small" />, label: "Products", active: false },
    { icon: <CategoryIcon fontSize="small" />, label: "Categories", active: true },
    { icon: <BarChartIcon fontSize="small" />, label: "Analytics", active: false },
    { icon: <DescriptionIcon fontSize="small" />, label: "Reports", active: false },
    { icon: <HomeIcon fontSize="small" />, label: "Customers", active: false },
    { icon: <InfoIcon fontSize="small" />, label: "Help", active: false },
  ];

  const otherItems = [
    { icon: <InfoIcon fontSize="small" />, label: "Knowledge Base", active: false },
  ];

  const settingsItems = [
    { icon: <SettingsIcon fontSize="small" />, label: "Settings", active: false },
    { icon: <PersonIcon fontSize="small" />, label: "Personal Settings", active: false },
    { icon: <PublicIcon fontSize="small" />, label: "Global Settings", active: false },
  ];

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#0B1F41", // dark sidebar background
        display: { xs: "none", md: "block" },
        boxShadow: 2,
        height: "100vh",
        borderRight: 1,
        borderColor: "divider",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          bgcolor: "#0B1F41",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: "secondary.main",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </Box>
        <Typography variant="h6" color="white" sx={{ ml: 2 }}>
          fastcart
        </Typography>
      </Box>

      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              bgcolor: item.active ? "#1A2E5C" : "transparent",
              "&:hover": { bgcolor: "#1F3B73" },
            }}
            button
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: "white" }} />
            {item.badge && (
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "12px",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
              >
                {item.badge}
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />

      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="caption" sx={{ textTransform: "uppercase", color: "#B0B8CC" }}>
          Other Information
        </Typography>
        <List>
          {otherItems.map((item, index) => (
            <ListItem key={index} button>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: "white" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />

      
    </Box>
  );
}
