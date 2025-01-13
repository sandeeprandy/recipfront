import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
 
} from "@mui/material";
import AddPostModal from "../Models/addPostModel";
import SelectedMenu from "./SelectedMenu";

const Header = ({ handleDrawerToggle,onPostAdded,sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleModalClose = () => {
    onPostAdded()
    setIsModalOpen(false);
  };

  return (
    <>
      <AppBar  sx={{ background: "#1c1c1c" ,}}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          {/* <Tooltip title="Add Post">
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleModalOpen}>
              <PostAddIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip> */}
          <SelectedMenu />

          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar src="/profile-pic.jpg" alt="Profile" />
          </IconButton>

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

      <AddPostModal open={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default Header;
