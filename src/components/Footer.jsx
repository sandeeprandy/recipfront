import React from "react";
import { Box, IconButton, Fab } from "@mui/material";
import { Add, Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = ({ onClick, showHeaderFooter }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "black",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
        transform: showHeaderFooter ? "translateY(0)" : "translateY(100%)",
        padding: "5px 0",
      }}
    >
      <IconButton  >
      <Link to="/Profile"> <AccountCircle fontSize="large" sx={{color: "#87CEEB"}} /></Link>  
      </IconButton>

      <Fab 
        color="primary" 
        onClick={onClick} 
        sx={{
          position: "absolute", 
          backgroundColor: "#87CEEB",
          top: "-25px", 
          zIndex: 10
        }}
      >
        <Add />
      </Fab>

      <IconButton color="primary"sx={{color: "#87CEEB"}}>
        <Notifications fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Footer;
