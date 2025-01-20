import React from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OmniaPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))',
        color: 'white',
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
        <Typography variant="body1" sx={{ maxWidth: '800px', margin: 'auto', marginBottom: 4 }}>
          Omnia is your one-stop destination to connect with local opportunities and services. 
          Whether you're looking for jobs, planning your next trip, promoting your small business, 
          finding nearby health services, or exploring education options, Omnia empowers you to 
          discover everything within your area based on your PIN code. 
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', margin: 'auto', marginBottom: 4 }}>
          Stay updated with local news, events, and community-driven insights. Omnia is designed 
          to bring the world closer, one neighborhood at a time.
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
              variant="contained"
              color="primary"
              sx={{ padding: '10px 20px', borderRadius: '25px', minWidth: '150px' }}
              component={Link}
              to="/explore"
            >
              Explore Now
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ padding: '10px 20px', borderRadius: '25px', color: 'white', borderColor: 'white', minWidth: '150px' }}
              component={Link}
              to="/register"
            >
              Join Us
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default OmniaPage;
