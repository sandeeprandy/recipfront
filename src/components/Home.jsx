import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUserFeed, getUserProfile } from "../slices/userSlices";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";
import Settings from "./Settings";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("newsfeed");

  const dispatch = useDispatch();
  const { feed, profile, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentPage === "newsfeed") {
      dispatch(getUserFeed());
    } else if (currentPage === "profile") {
      dispatch(getUserProfile());
    }
  }, [currentPage, dispatch]);

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
        {loading && <div>Loading...</div>}
        {!loading && currentPage === "newsfeed" && <NewsFeed feed={feed} />}
        {!loading && currentPage === "profile" && <Profile profile={profile} />}
        {!loading && currentPage === "settings" && <Settings />}
      </Box>
    </Box>
  );
};

export default HomePage;
