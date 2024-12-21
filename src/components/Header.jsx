import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Header = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ background: "#1c1c1c" }}>
      <Toolbar>
        {/* Drawer Toggle Button */}
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        {/* Profile Avatar */}
        <Tooltip title="Add Post">
  <IconButton color="inherit" sx={{ ml: 1 }}>
    <PostAddIcon sx={{ fontSize: 40 }} />
  </IconButton>
</Tooltip>

        {/* Input Box for Pin Code */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Enter pin code"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginLeft: 1,
            marginRight: 2,
            width: 150,
          }}
        />

        {/* Tooltip with Add Post Icon */}
      
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar src="/profile-pic.jpg" alt="Profile" />
        </IconButton>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: "45px" }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
