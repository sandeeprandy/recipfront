import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, TextField, Button, Typography, useMediaQuery, Backdrop, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/system";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        "https://recipback.vercel.app/api/auth/login",
        { email, password }
      );
      setLoading(false)
      localStorage.setItem("userinfo", JSON.stringify(response.data));
      onLoginSuccess();
      navigate("/home");
    } catch (error) {
      
      setError("Invalid email or password.");
      setLoading(false)
    }
  };

  return (
    <>
    <Box
      sx={{
        background: "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "1rem" : "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: isMobile ? "80%" : "400px",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} textAlign="center" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/">Register</Link>
          </Typography>
          {error && (
            <Typography color="error" textAlign="center" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </motion.div>
    </Box>
    <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, skyblue, #4682B4)', // Sky blue to Dark Sky blue gradient
        }}
        open={loading} // Display loader based on the loading state
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Login;
