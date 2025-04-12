"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

export function AddEditCategoryDialog({ open, onOpenChange, category, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    items: 0,
    imageUrl: "/placeholder.svg?height=200&width=300",
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        items: category.items || 0,
        imageUrl: category.imageUrl || "/placeholder.svg?height=200&width=300",
      });
    } else {
      setFormData({
        name: "",
        items: 0,
        imageUrl: "/placeholder.svg?height=200&width=300",
      });
    }
    setImageError(false);
  }, [category, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "items" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: category?.id || "",
      ...formData,
    });
    onOpenChange(false); // close after save
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Number of Items"
            name="items"
            type="number"
            value={formData.items}
            onChange={handleChange}
            required
            inputProps={{ min: 0 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
              setImageError(false); // reset error on change
            }}
            required
          />
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Preview:
            </Typography>
            <img
              src={imageError ? "/placeholder.svg?height=200&width=300" : formData.imageUrl}
              alt="Category preview"
              style={{
                width: "100%",
                height: "128px",
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #eee",
              }}
              onError={() => setImageError(true)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onOpenChange(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
