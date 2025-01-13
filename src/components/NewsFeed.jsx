import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Dialog,
  Button,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Header from "./Header";
import InstagramPost from "./postCards";
import AddPostModal from "../Models/addPostModel";

const NewsFeed = () => {
  const feed = useSelector((state) => state.user.feed);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const postsContainerRef = useRef(null); // Reference for posts container
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const postsContainer = postsContainerRef.current;

    const handleScroll = () => {
      const currentScrollPos = postsContainer.scrollTop;
      if (currentScrollPos > lastScrollPos) {
        // Scrolling down
        setShowHeaderFooter(false);
      } else {
        // Scrolling up
        setShowHeaderFooter(true);
      }
      setLastScrollPos(currentScrollPos);
    };

    if (postsContainer) {
      postsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (postsContainer) {
        postsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollPos]);

  return (
    <Box>
      {/* Header */}
      <Header />

      {/* News Feed */}
      <Box
        ref={postsContainerRef}
        sx={{
          height: "100vh",
          overflowY: "auto", // Allows vertical scrolling
          background: "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "2px",
          scrollbarWidth: "none", // Hides the scrollbar in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in WebKit browsers like Chrome, Safari
          },
        }}
        
      >
        <Grid
          container
          spacing={2}
          component={motion.div}
          layout
          sx={{ marginTop: "9vh" }}
        >
          {feed?.posts?.length > 0 ? (
            feed.posts.map((post) => (
              <Grid
                item
                xs={12}
                S
                sm={6}
                md={4}
                key={post.id}
                component={motion.div}
                layout
                // whileHover={{
                //   scale: 1.05,
                //   transition: { duration: 0.3 },
                // }}
              >
                <InstagramPost data={post} key={post.id} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
              No posts available.
            </Typography>
          )}
        </Grid>

        {/* Modal for Full-Size Image */}
        <Dialog
          open={!!selectedImage}
          onClose={handleCloseDialog}
          maxWidth="lg"
        >
          <Box sx={{ p: 2 }}>
            <img
              src={selectedImage}
              alt="Selected Post"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Dialog>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          overflow: "hidden",
          left: 0,
          right: 0,
          height: "64px",
          // backgroundColor: "#1d3557",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          transform: showHeaderFooter ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Button
          variant="contained"
          // color="primary"
          onClick={handleModalOpen}
        >
          Add Post
        </Button>
      </Box>
      <AddPostModal open={isModalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default NewsFeed;
