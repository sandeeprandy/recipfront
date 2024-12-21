import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

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
  const [imageUrl, setImageUrl] = useState(null); // To store the image URL

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ilaakaName: "",
      pinCode: "",
      description: "",
      image: null,
    },
  });

  // Handle image change, and upload to ImgBB
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("image", file); // Updates react-hook-form value for image
      setImagePreview(URL.createObjectURL(file)); // Sets image preview

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=135b0455e99f3ddb19ace9e9e588f5af", // Replace YOUR_API_KEY with your actual API key
          formData
        );
        // Get the image URL from the response
        const url = response.data.data.url;
        setImageUrl(url); // Store the URL
        console.log("Image URL: ", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview(null);
    setImageUrl(null);
    onClose();
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Log form data for debugging
    const formData = new FormData();
    formData.append("ilaakaName", data.ilaakaName);
    formData.append("pinCode", data.pinCode);
    formData.append("description", data.description);
    formData.append("image", imageUrl); // Use the image URL instead of the binary data

    try {
      const response = await axios.post(
        "https://recipback.onrender.com/api/posts/addPost",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="ilaakaName"
            control={control}
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
            name="pinCode"
            control={control}
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
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{ width: 100, height: "auto", mb: 2, borderRadius: 1 }}
            />
          )}
          {imageUrl && (
            <Box
              component="a"
              href={imageUrl}
              target="_blank"
              sx={{ textDecoration: "none", color: "primary.main" }}
            >
              Open Image in New Tab
            </Box>
          )}
          {errors.image && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errors.image.message}
            </Typography>
          )}
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
