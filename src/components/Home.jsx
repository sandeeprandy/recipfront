import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";
import Settings from "./Settings";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("newsfeed");
  

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleSidebarToggle} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
        setCurrentPage={setCurrentPage}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sidebarOpen ? 240 : 64}px)`,
          mt: 8,
        }}
      >
        {currentPage === "newsfeed" && <NewsFeed />}
        {currentPage === "profile" && <Profile />}
        {currentPage === "settings" && <Settings />}
      </Box>
    </Box>
  );
};

export default HomePage;
