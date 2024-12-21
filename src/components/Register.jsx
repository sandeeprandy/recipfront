import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  pinCode: yup
    .string()
    .matches(/^\d{6}$/, "Pin Code must be 6 digits")
    .required("Pin Code is required"),
  illaka: yup.string().required("Illaka is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        "https://recipback.onrender.com/register",
        data
      );
      console.log(response.data.message);
      window.location.href = "/login";
    } catch (err) {
      setError("api", { message: "Registration failed. Please try again." });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(0deg, rgba(173,250,255,1), rgba(128,168,255,1))",
        padding: 2,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: { xs: "1.1rem", sm: "2.1rem", md: "2rem" }, // Adjust font size for different screen sizes
        }}
      >
        Create New Account
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          marginBottom: 2,
          fontSize: { xs: "0.775rem", sm: "1rem", md: "1.05rem" }, // Adjust font size for different screen sizes
        }}
      >
        Create an account to become a member of Na Illaka site
      </Typography>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Card
          sx={{
            maxWidth: { xs: "300px", sm: "600px" }, // 300px for mobile (xs), 600px for larger devices (sm and up)
            width: "80%",
      
            padding: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(handleRegister)}>
            <Grid container spacing={2}>
              {/** First Name and Last Name */}
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
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
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
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      variant="outlined"
                      InputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                />
              </Grid>

              {/** Email and Illaka */}
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
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      variant="outlined"
                      InputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="illaka"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Illaka"
                      fullWidth
                      error={!!errors.illaka}
                      helperText={errors.illaka?.message}
                      variant="outlined"
                      InputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                />
              </Grid>

              {/** Phone Number and Pin Code */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
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
                      label="Pin Code"
                      fullWidth
                      error={!!errors.pinCode}
                      helperText={errors.pinCode?.message}
                      variant="outlined"
                      InputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                />
              </Grid>

              {/** Password and Confirm Password */}
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
                      error={!!errors.password}
                      helperText={errors.password?.message}
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
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      variant="outlined"
                      InputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {errors.api && (
              <Typography color="error" sx={{ marginTop: 2 }}>
                {errors.api.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: 3,
                padding: "10px",
                width: { xs: "auto", sm: "100%" }, // auto width on mobile, full width on tablets and above
              }}
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
        </Card>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;
