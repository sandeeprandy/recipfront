import React from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OmniaPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background:
          "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
        color: "#1B1C2A",
        padding: 2,
      }}
    >
      {/* Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Omnia
        </Typography>
        <Typography variant="h5" gutterBottom>
          Connecting Everything You Need, All in One Platform
        </Typography>
      </motion.div>

      {/* Description Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", margin: "auto", marginBottom: 4 }}
        >
          Omnia is your one-stop destination to connect with local opportunities
          and services. Whether you're looking for jobs, planning your next
          trip, promoting your small business, finding nearby health services,
          or exploring education options, Omnia empowers you to discover
          everything within your area based on your PIN code.
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", margin: "auto", marginBottom: 4 }}
        >
          Stay updated with local news, events, and community-driven insights.
          Omnia is designed to bring the world closer, one neighborhood at a
          time.
        </Typography>
      </motion.div>

      {/* Buttons Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
          <Button
              variant="outlined"
              color="secondary"
              sx={{
                padding: "10px 20px",
                borderRadius: "25px",
                color: "black",
                minWidth: "150px",
                position: "relative",
                backgroundColor: "white",
                overflow: "hidden",
                zIndex: 1,
                border: "none", // Remove default border since we are using a pseudo-element for the effect

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "inherit",
                  padding: "3px", // Thickness of the border
                  background:
                    "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                  WebkitMask:
                    "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  zIndex: -1,
                },

                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              component={Link}
              to="/login"
            >
             Explore Now
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                padding: "10px 20px",
                borderRadius: "25px",
                color: "black",
                minWidth: "150px",
                position: "relative",
                backgroundColor: "white",
                overflow: "hidden",
                zIndex: 1,
                border: "none", // Remove default border since we are using a pseudo-element for the effect

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "inherit",
                  padding: "3px", // Thickness of the border
                  background:
                    "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                  WebkitMask:
                    "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                  zIndex: -1,
                },

                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              component={Link}
              to="/register"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default OmniaPage;
