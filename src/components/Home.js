import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, IconButton, Divider, Avatar, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useState } from "react";

const drawerWidth = 240;

const HomePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("newsfeed"); // Default page
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Avatar src="/profile-pic.jpg" alt="Profile" />
        <Typography variant="h6" component="div" sx={{ marginLeft: 2 }}>
          Welcome, User!
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation("profile")}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("newsfeed")}>
          <ListItemText primary="News Feed" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("settings")}>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            News Feed App
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
        }}
      >
        <Toolbar />
        {currentPage === "profile" && <Profile />}
        {currentPage === "newsfeed" && <NewsFeed />}
        {currentPage === "settings" && <Settings />}
      </Box>
    </Box>
  );
};

// Dummy Components
const Profile = () => <Typography variant="h4">Profile Page</Typography>;

const NewsFeed = () => {
  const posts = [
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update from your friend.", author: "User2" },
    { id: 3, content: "React and Framer Motion are awesome!", author: "User3" },
  ];

  return (
    <Box>
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              ":hover": { boxShadow: 6 },
            }}
          >
            <Typography variant="h6">{post.author}</Typography>
            <Typography>{post.content}</Typography>
          </Paper>
        </motion.div>
      ))}
    </Box>
  );
};

const Settings = () => <Typography variant="h4">Settings Page</Typography>;

export default HomePage;
