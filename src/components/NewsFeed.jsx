import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import InstagramPost from "./postCards";

const Feeds = ({ feed, postsContainerRef, onPostClick }) => {
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
              <InstagramPost data={post}  onPostClick={() => onPostClick(post)} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
            No posts available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Feeds;
