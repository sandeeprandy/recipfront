import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const NewsFeed = () => {
  const posts = [
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
    { id: 1, content: "This is the first post!", author: "User1" },
    { id: 2, content: "Here's another update.", author: "User2" },
  ];

  return (
    <Box
      sx={{
        maxHeight: "80vh", // Set the max height of the container
        overflowY: "auto", // Enable vertical scrolling
        paddingRight: "16px", // Add some padding to prevent scrollbar overlap
      }}
    >
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{post.author}</Typography>
              <Typography>{post.content}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsFeed;
