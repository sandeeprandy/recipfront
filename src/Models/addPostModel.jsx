/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const validationSchema = Yup.object().shape({
  ilaakaName: Yup.string().required("Ilaaka Name is required"),
  pinCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^\d{6}$/, "Pin Code must be 6 digits"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddPostModal = ({ open, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      image: null,
    },
  });

  const handleImageChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only images are allowed. Please upload a valid image.");
        return;
      }

      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=94f611bff437cbcdb160d17d5a97ec22",
          formData
        );
        setImageUrl(response.data.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  });

  const handleCancel = () => {
    reset();
    setImagePreview(null);
    setImageUrl(null);
    onClose();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const jsonData = {
      postType: data.postType,
      ilaakaName: data.ilaakaName,
      pinCode: data.pinCode,
      description: data.description,
      image: imageUrl,
      price: data.price,
      phoneNumber: data.phoneNumber,
      firstName: userinfo?.user[0][0]?.first_name,
      lastName: userinfo?.user[0][0]?.last_name,
    };

    try {
      const response = await axios.post(
        "https://recipback.vercel.app/api/posts/addPost",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      console.log("Post added successfully:", response.data);
      <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
      Post added successfully!
    </Alert>
      handleCancel();
    } catch (error) {
      setLoading(false);
      console.error("Error adding post:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "400px" },
            maxHeight: "85vh",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Post
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="postType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Post Type"
                  variant="outlined"
                  error={!!errors.postType}
                  helperText={errors.postType?.message}
                  sx={{ mb: 2 }}
                >
                  {[
                    "Food",
                    "Travel",
                    "News",
                    "Events",
                    "Health",
                    "Business",
                    "Shopping",
                    "Delivery",
                    "Manpower",
                    "Jobs",
                    "Education",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              <IconButton
                color="primary"
                component="label"
                sx={{ display: { xs: "flex", sm: "none" } }} // Only show on mobile
              >
                <CameraAltIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  capture="environment" // Open the device camera
                  onChange={handleImageChange}
                />
              </IconButton>
            </Box>

            {/* Image Preview */}
            {imagePreview && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: 50,
                    height: "auto",
                    borderRadius: 1,
                    mb: 1,
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
            )}
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Price"
                  variant="outlined"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="pinCode"
              control={control}
              defaultValue={userinfo?.user[0][0].pin_code || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Pin Code"
                  variant="outlined"
                  error={!!errors.pinCode}
                  helperText={errors.pinCode?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="ilaakaName"
              control={control}
              defaultValue={userinfo?.user[0][0].ilaaka || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Ilaaka Name"
                  variant="outlined"
                  error={!!errors.ilaakaName}
                  helperText={errors.ilaakaName?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={userinfo?.user[0][0].phone_number || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add Post
              </Button>
            </Box>
          </form>
        </Box>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "linear-gradient(135deg, skyblue, #4682B4)",
            display: "flex",
            flexDirection: "column", // Stack elements vertically
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          open={loading} // Display loader based on the loading state
        >
          <CircularProgress color="inherit" />
          <Typography
            variant="h6"
            mt={2}
            sx={{ maxWidth: "80%", fontStyle: "italic" }}
          >
            "You Have Nothing to Lose, Because Nothing is Yours." — Bhagavad
            Gita
          </Typography>
        </Backdrop>
      </>
    </Modal>
  );
};

export default AddPostModal;
