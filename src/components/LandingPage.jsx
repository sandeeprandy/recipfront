import React from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NaElakaPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(80deg, #000000,  #0ff5e2 )',
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
          Welcome to Na Elaka
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your one-stop platform to connect with local sellers.
        </Typography>
      </motion.div>

      {/* Description Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography variant="body1" sx={{ maxWidth: '600px', margin: 'auto', marginBottom: 4 }}>
          Na Elaka connects users with local sellers offering a variety of products like medicines,
          alcohol, vegetables, meat, and tent houses. Enter your PIN code to find sellers near you.
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
              to="/login"
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ padding: '10px 20px', borderRadius: '25px', color: 'white', borderColor: 'white', minWidth: '150px' }}
              component={Link}
              to="/Register"
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default NaElakaPage;
