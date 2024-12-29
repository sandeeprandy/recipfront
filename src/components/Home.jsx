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
  const [userPincode, setUserPincode] = useState(() => {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    return userinfo?.user[0][0].pin_code;
  });
  const [refreshFeed, setRefreshFeed] = useState(false); // State to trigger useEffect

  const dispatch = useDispatch();
  const { feed, profile, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentPage === "newsfeed") {
      dispatch(getUserFeed(userPincode));
    } else if (currentPage === "profile") {
      dispatch(getUserProfile());
    }
  }, [currentPage, dispatch, userPincode, refreshFeed]); // Include refreshFeed in dependencies

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Callback to refresh feed
  const handleRefreshFeed = () => {
    setRefreshFeed((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header handleDrawerToggle={handleSidebarToggle} onPostAdded={handleRefreshFeed} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
        setCurrentPage={setCurrentPage}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
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
