import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import SelectedMenu from "./SelectedMenu";
import { getUserFeed } from "../slices/userSlices";
import { useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileModel, setProfileModel] = useState(null);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const [userPincode, setuserPinCode] = useState(
    userinfo?.user[0][0]?.pin_code
  );

  const [tempPincode, setTempPincode] = useState(userPincode);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenProfileMenu = (event) => {
    setProfileModel(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePincodeChange = () => {
    setuserPinCode(tempPincode); // Update pincode
    handleCloseMenu();
  };

  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = { pincode: userPincode, filter };
    dispatch(getUserFeed(requestData));
  }, [dispatch, userPincode, filter]);


  const handleMenuProfileClose = () => {
    setProfileModel(null);
  };

  return (
    <>
      <AppBar sx={{ background: "#1c1c1c" }}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontFamily: 'Arial',// Replace with the actual font family name
              fontWeight: "bold",
              letterSpacing: "0.5px",
              color: "#FFFFFF",
            }}
          > Omnia</Typography>

          {/* <Tooltip title="Add Post">
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleModalOpen}>
              <PostAddIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip> */}
          <Typography variant="body1">{userPincode}</Typography>
          <IconButton sx={{ color: "white" }}>
            <ArrowDropDownIcon
              onClick={handleOpenMenu}
              sx={{ fontSize: "32px", fontWeight: "bold" }}
            />
          </IconButton>

          <SelectedMenu setFilter={setFilter} />

          <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}>
            <Avatar src="/profile-pic.jpg" alt="Profile" />
          </IconButton>

          <Menu
            anchorEl={profileModel}
            open={Boolean(profileModel)}
            onClose={handleMenuProfileClose}
            sx={{ mt: "45px" }}
          >
            <MenuItem onClick={handleMenuProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuProfileClose}>Logout</MenuItem>
          </Menu>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            sx={{
              "& .MuiMenu-paper": {
                padding: "16px",
                backgroundColor: "#f4f4f4",
              },
            }}
          >
            <TextField
              value={tempPincode}
              onChange={(e) => setTempPincode(e.target.value)}
              label="Enter Pin Code"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "8px" }}
            />
            <Button
              onClick={handlePincodeChange}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            >
              Update
            </Button>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
