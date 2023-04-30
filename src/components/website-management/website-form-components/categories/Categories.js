import { Alert, Box, Button, Typography } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import CategoryDialogBox from "./CategoryDialogBox";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

export default function Categories(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (props.websiteId) {
      getAllCookieCategories();
    }
  }, [props.websiteId]);

  // Functions to get categories from backend.
  async function getAllCookieCategories() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/${websiteId}/getCookieCategories`
      );
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Related add category and edit category dialog box.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: null,
    categoryName: "",
    categoryDescription: "",
  });

  function handleAddCategory() {
    setIsDialogOpen(true);
    setSelectedCategory({
      categoryId: null,
      categoryName: "",
      categoryDescription: "",
    });
  }

  function handleEditCategory(categoryToEdit) {
    setSelectedCategory(categoryToEdit);
    setIsDialogOpen(true);
  }

  function handleCancelClick() {
    setIsDialogOpen(false);
  }

  function addNewCategory(newCategory) {
    setCategories([...categories, newCategory]);
  }
  function updateCategory(updatedCategory) {
    const updatedCategoires = categories.map((category) =>
      category.categoryId === updatedCategory.categoryId
        ? updatedCategory
        : category
    );
    setCategories(updatedCategoires);
  }

  async function handleSaveCategory(category) {
    if (selectedCategory.categoryId) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/updateCategory`,
          category
        );
        if (response.data) {
          updateCategory(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let websiteId = props.websiteId;
        const response = await axios.post(
          `http://localhost:8080/api/v1/${websiteId}/addCookieCategory`,
          category
        );
        if (response.data) {
          addNewCategory(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsDialogOpen(false);
  }

  // Related To deleting category.
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategorytoDelete] = useState({});

  function handleOpenDeleteDialog(deletingCategory) {
    setCategorytoDelete(deletingCategory);
    setIsOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setCategorytoDelete({});
    setIsOpenDeleteDialog(false);
  }

  function removeCategory(categoryId) {
    const newCategories = categories.filter(
      (category) => category.categoryId !== categoryId
    );
    setCategories(newCategories);
  }

  async function handleDeleteClick() {
    try {
      let websiteId = props.websiteId;
      let categoryId = categoryToDelete.categoryId;
      const response = await axios.delete(
        `http://localhost:8080/api/v1/${websiteId}/${categoryId}/deleteCategory`
      );
      if (response.data) {
        removeCategory(categoryId);
        handleCloseDeleteDialog();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const alert = (
    <Alert severity="info">
      No categories found. Please add categories using the 'Add Category'
      button.
    </Alert>
  );

  const categoryList = categories.map((category) => (
    <CategoryCard
      key={category.categoryId}
      category={category}
      handleEditCategory={handleEditCategory}
      handleOpenDeleteDialog={handleOpenDeleteDialog}
    />
  ));

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Configure Your Website's Cookie Categories.
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        To add a new cookie category for your website, simply click on the "Add
        Category" button below and fill out the required information.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, mb: 5, bgcolor: "#00A5FF" }}
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
      <CategoryDialogBox
        isOpen={isDialogOpen}
        handleClose={handleCancelClick}
        handleSaveCategory={handleSaveCategory}
        category={selectedCategory}
      />
      {categories.length === 0 ? alert : categoryList}
      <DeleteCategoryDialog
        isOpen={isOpenDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        categoryToDelete={categoryToDelete}
        handleDeleteClick={handleDeleteClick}
      />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<ArrowBackIosNewOutlinedIcon />}>Back</Button>
        <Button
          endIcon={<NavigateNextOutlinedIcon />}
          variant="contained"
          sx={{ bgcolor: "#00A5FF" }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
