import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function CategoryDialogBox(props) {
  const [category, setCategory] = useState({
    categoryId: null,
    categoryName: "",
    categoryDescription: "",
  });
  const { categoryName, categoryDescription } = category;
  const [errors, setErrors] = useState([false, false]);
  const [errorMessages, setErrorMessages] = useState(["", ""]);

  useEffect(() => {
    if (props.category) {
      setCategory(props.category);
    }
  }, [props.category]);

  function handleOnChange(event) {
    setCategory({ ...category, [event.target.name]: event.target.value });
  }

  function handleSaveClick() {
    setErrors([false, false]);
    setErrorMessages(["", ""]);
    if (categoryName === "" && categoryDescription === "") {
      setErrors([true, true]);
      setErrorMessages([
        "Category Name can not be empty.",
        "Description can not be empty.",
      ]);
      return;
    }
    if (categoryName && categoryDescription === "") {
      setErrors([false, true]);
      setErrorMessages(["", "Description can not be empty."]);
      return;
    }
    if (categoryName === "" && categoryDescription) {
      setErrors([true, false]);
      setErrorMessages("Category Name can not be empty.", "");
      return;
    }
    props.handleSaveCategory(category);
  }

  function handleCancelClick() {
    setErrors([false, false]);
    setErrorMessages(["", ""]);
    props.handleClose();
  }

  return (
    <Box>
      <Dialog open={props.isOpen} onClose={handleCancelClick}>
        <DialogTitle sx={{ color: "#004587", fontWeight: "600" }}>
          Add New Cookie Category
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            To help you manage your cookie categories, we are asking you to add
            new cookie categories.
          </DialogContentText>
          <TextField
            required
            autoComplete="off"
            label="Category Name"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="categoryName"
            value={categoryName}
            onChange={handleOnChange}
            error={errors[0]}
            helperText={errorMessages[0]}
          />
          <TextField
            required
            autoComplete="off"
            label="Category Description"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="categoryDescription"
            value={categoryDescription}
            onChange={handleOnChange}
            error={errors[1]}
            helperText={errorMessages[1]}
          />
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button onClick={handleCancelClick} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            sx={{ bgcolor: "#00A5FF", color: "white" }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
