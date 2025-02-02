import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import InstagramPost from "./postCards";
import { useSelector } from "react-redux";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const Feeds = ({ feed, postsContainerRef, onPostClick }) => {
  const skeletonArray = new Array(10).fill(null); // Create an array with 10 skeletons
  const isLoading = useSelector((state) => state.user.loading);
  
  return (
    <Box
      ref={postsContainerRef}
      sx={{
        height: "100%",
        overflowY: "auto",
        background:
          "linear-gradient(0deg, rgb(184, 222, 224), rgb(184, 200, 235))",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        paddingLeft: { xs: "0px", sm: "20px", md: "40px" },
        paddingRight: { xs: "0px", sm: "20px", md: "40px" },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Grid
        container
        spacing={{ xs: 0, lg: 6 }}
        component={motion.div}
        layout
        sx={{ marginTop: { xs: "9vh", sm: "20px", md: "40px" } }}
      >
        {feed?.posts?.length > 0 ? (
          feed.posts.map((post) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={post.id}
              component={motion.div}
              layout
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              // onClick={() => onPostClick(post)}
              sx={{ cursor: "pointer" }}
            >
              <InstagramPost
                data={post}
                onPostClick={() => onPostClick(post)}
              />
            </Grid>
          ))
        ) : (
          <>
            {" "}
            {!isLoading ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                width="100%" // Ensures it takes full width
                textAlign="center" // Helps center text content if needed
              >
                <>
                 
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={2}
                    sx={{ color: "black" }}
                  >
                    There are no posts in this area!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    Add a post now and earn{" "}
                    <strong style={{ color: "#28a745" }}>₹500</strong> for your
                    first post in your area.
                  </Typography>
                  <Box display="flex" gap={1} mt={2}>
                    <EmojiEventsIcon sx={{ fontSize: 40, color: "#ff9800" }} />
                    <LocalAtmIcon sx={{ fontSize: 40, color: "#4caf50" }} />
                    <MonetizationOnIcon sx={{ fontSize: 40, color: "gold" }} />
                  </Box>
                </>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {skeletonArray.map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    {/* Card Wrapper with white background and padding */}
                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "8px", // Rounded corners
                        padding: 2,
                        boxShadow: 1, // Subtle shadow for card effect
                      }}
                    >
                      {/* Profile Section */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        {/* Profile Picture Skeleton */}
                        <Skeleton
                          variant="circular"
                          width={40}
                          height={40}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="text" width="60%" />
                      </Box>

                      {/* Post Image Skeleton */}
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />

                      {/* Post Caption Skeleton */}
                      <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
                      <Skeleton variant="text" width="80%" sx={{ mt: 0.5 }} />

                      {/* Follow Button Skeleton */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={30}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={30}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Feeds;
