"use client";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export function CategoryGrid({ categories, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleMenuOpen = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={category.id}>
          <Card
            sx={{
              height: 280,
              minWidth: 280, // Fixed card width
              maxWidth: 300, // Fixed card width, prevents shrinking
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <Box sx={{ position: "relative", height: 180 }}>
              <CardMedia
                component="img"
                height="180"
                image={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                onError={(e) => {
                  const placeholder = `${window.location.origin}/placeholder.svg`;
                  if (e.target.src !== placeholder) {
                    e.target.src = placeholder;
                  }
                }}
              />
              <IconButton
                aria-label="more options"
                onClick={(e) => handleMenuOpen(e, category.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  "&:hover": { backgroundColor: "#fff" },
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={selectedCategoryId === category.id}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    onEdit(category);
                    handleMenuClose();
                  }}
                >
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDelete(category.id);
                    handleMenuClose();
                  }}
                  sx={{ color: "error.main" }}
                >
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
                </MenuItem>
              </Menu>
            </Box>

            <CardContent
              sx={{
                px: 2,
                py: 1.5,
                minHeight: 80, // Ensures all cards are uniform regardless of name length
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                noWrap
                title={category.name}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap", // Prevents name from wrapping
                  display: "block", // Ensures the text doesn't affect layout
                }}
              >
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.items} {category.items === 1 ? "item" : "items"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
