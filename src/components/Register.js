import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const { control, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const watchPassword = watch("password", "");

  const handleRegister = async (data) => {
    try {
      const { password, ...otherFields } = data;

      // Send all fields with `password` as a single value
      const payload = { ...otherFields, password };
      const response = await axios.post(
        "https://recipback.onrender.com/register",
        payload
      );

      console.log(response.data.message); // Log registration success message
      window.location.href = "/login";
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(0deg, #adfaff, #80a8ff)",
        color: "white",
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" gutterBottom>
          Register
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          sx={{ maxWidth: "600px", width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="pinCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PIN Code"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="elakaName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Elaka Name"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    error={field.value !== watchPassword}
                    helperText={
                      field.value !== watchPassword
                        ? "Passwords do not match"
                        : ""
                    }
                    InputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3, padding: "10px" }}
          >
            Register
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#0ff5e2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;
