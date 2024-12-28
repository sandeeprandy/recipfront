import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const NewsFeed = () => {
  const feed = useSelector((state) => state.user.feed);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflowY: "auto",
        paddingRight: "16px",
        background: "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="h4" sx={{ color: "#333", mb: 3, textAlign: "center" }}>
        News Feed
      </Typography>
      <Grid container spacing={3} component={motion.div} layout>
        {feed?.posts?.length > 0 ? (
          feed.posts.map((post) => (
            <Grid
              item
              xs={12}
              md={6}
              key={post.id}
              component={motion.div}
              layout
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                }}
              >
                <Typography variant="h6" sx={{ color: "#1d3557", fontWeight: "bold" }}>
                  {post.first_name} {post.last_name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#457b9d" }}>
                  <strong>Pin Code:</strong> {post.pinCode}
                </Typography>
                <Typography variant="body2" sx={{ color: "#457b9d" }}>
                  <strong>Ilaaka Name:</strong> {post.ilaakaName || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                  <strong>Description:</strong> {post.description}
                </Typography>
                {post.image && (
                  <Box
                    component="img"
                    src={post.image}
                    alt="Post Image"
                    loading="lazy"
                    onClick={() => handleImageClick(post.image)}
                    sx={{
                      width: "80%",
                      height: "150px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                )}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  Created At: {new Date(post.createdAt).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
            No posts available.
          </Typography>
        )}
      </Grid>

      {/* Modal for Full-Size Image */}
      <Dialog open={!!selectedImage} onClose={handleCloseDialog} maxWidth="lg">
        <Box sx={{ p: 2 }}>
          <img
            src={selectedImage}
            alt="Selected Post"
            style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px" }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default NewsFeed;
