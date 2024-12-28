import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Profile = () => {
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));

  if (!userinfo) {
    return <Typography variant="h6" sx={{ color: "#ff4040" }}>No user information found!</Typography>;
  }

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
        padding: "20px",
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1d3557", marginBottom: 2 }}>
          Profile Information
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: 1 }}>
          <strong>Full Name:</strong> {userinfo.user[0].first_name}  {userinfo.user[0].last_name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: 1 }}>
          <strong>Email:</strong> {userinfo.user[0].email}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: 1 }}>
          <strong>Phone Number:</strong> {userinfo.user[0].phone_number}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: 1 }}>
          <strong>Pin Code:</strong> {userinfo.user[0].pin_code}
        </Typography>
        <Typography variant="body1" sx={{ color: "#333", marginBottom: 2 }}>
          <strong>Area:</strong> {userinfo.user[0].ilaaka}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555", textAlign: "center" }}>
          <strong>Account Created:</strong> {new Date(userinfo.user[0].created_at).toLocaleString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
