/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
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
          "https://api.imgbb.com/1/upload?key=135b0455e99f3ddb19ace9e9e588f5af",
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
    const formData = new FormData();
    formData.append("ilaakaName", data.ilaakaName);
    formData.append("pinCode", data.pinCode);
    formData.append("description", data.description);
    formData.append("image", imageUrl);
    formData.append("price", data.price);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("firstName ", userinfo?.user[0][0]?.first_name);
    formData.append("lastName", userinfo?.user[0][0]?.last_name);

    try {
      const response = await axios.post(
        "https://recipback.onrender.com/api/posts/addPost",
        formData
      );
      console.log("Post added successfully:", response.data);
      handleCancel();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleCancel}>
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
    </Modal>
  );
};

export default AddPostModal;
