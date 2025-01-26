import React from "react";
import { Box, Button } from "@mui/material";

const Footer = ({ onClick, showHeaderFooter }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        overflow: "hidden",
        left: 0,
        right: 0,
        height: "64px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease",
        transform: showHeaderFooter ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <Button variant="contained" onClick={onClick}>
        Add Post
      </Button>
    </Box>
  );
};

export default Footer;
