"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Avatar,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


import { Sidebar } from "./Sidebar";
import { CategoryGrid } from "./category-grid";
import { AddEditCategoryDialog } from "./add-edit-category-dialog";
import { loadCategories, saveCategories } from "../lib/local-storage";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const storedCategories = loadCategories();
    if (storedCategories.length === 0) {
      const defaultCategories = [
        {
          id: "1",
          name: "Men Clothes",
          items: 24,
          imageUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "2",
          name: "Women Clothes",
          items: 18,
          imageUrl: "https://images.pexels.com/photos/936116/pexels-photo-936116.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "3",
          name: "Accessories",
          items: 12,
          imageUrl: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "4",
          name: "Cotton Clothes",
          items: 31,
          imageUrl: "https://images.pexels.com/photos/977703/pexels-photo-977703.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "5",
          name: "Summer Clothes",
          items: 26,
          imageUrl: "https://images.pexels.com/photos/1002646/pexels-photo-1002646.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "6",
          name: "Wedding Clothes",
          items: 22,
          imageUrl: "https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "7",
          name: "Spring Collection",
          items: 19,
          imageUrl: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "8",
          name: "Casual Clothes",
          items: 25,
          imageUrl: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
        {
          id: "9",
          name: "Hats",
          items: 14,
          imageUrl: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&h=200&w=300",
        },
      ];
      
      
      setCategories(defaultCategories);
      saveCategories(defaultCategories);
    } else {
      setCategories(storedCategories);
    }
  }, []);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleSaveCategory = (category) => {
    let updatedCategories;

    if (editingCategory) {
      updatedCategories = categories.map((c) =>
        c.id === category.id ? category : c
      );
    } else {
      const newCategory = { ...category, id: Date.now().toString() };
      updatedCategories = [...categories, newCategory];
    }

    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    setIsDialogOpen(false);
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter((c) => c.id !== id);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        flex={1}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        {/* Header */}
        <AppBar
  position="sticky"
  elevation={0}
  sx={{
    bgcolor: "black",
    color: "white",
  }}
>
  <Toolbar sx={{ justifyContent: "space-between" }}>
    {/* Left Side - Logo and Search */}
    <Box display="flex" alignItems="center" gap={2}>
     

      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        sx={{
          width: 240,
          bgcolor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            paddingRight: "8px",
          },
          "& input": {
            padding: "8.5px 14px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Box>

    {/* Right Side - Icons */}
    <Box display="flex" alignItems="center" gap={2}>
      {/* Message Icon */}
      <Box
        sx={{
          bgcolor: "#162A51",
          p: 1,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NotificationsNoneIcon fontSize="small" />
      </Box>

      {/* Notification Icon */}
      <Box
        sx={{
          bgcolor: "#162A51",
          p: 1,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MailOutlineIcon fontSize="small" />

      </Box>

      {/* User Avatar */}
      <Avatar sx={{ bgcolor: "green", width: 32, height: 32 }}>N</Avatar>
    </Box>
  </Toolbar>
</AppBar>


        {/* Main Content */}
        <Box component="section" flex={1} overflow="auto" p={2}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Categories
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
          </Box>

          {/* Category Grid */}
          <CategoryGrid
            categories={categories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </Box>
      </Box>

      {/* Dialog */}
      <AddEditCategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={editingCategory}
        onSave={handleSaveCategory}
      />
    </Box>
  );
}
