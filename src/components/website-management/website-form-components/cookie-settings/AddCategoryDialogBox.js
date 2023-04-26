import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddCategoryDialogBox(props) {
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [newCategoryError, setNewCategorError] = React.useState(false);
  const [newCategoryErrorMessage, setNewCategoryErrorMessage] =
    React.useState("");

  function handleChangeNewCategory(event) {
    setNewCategoryName(event.target.value);
  }

  function handleSaveButtonClick() {
    setNewCategorError(false);
    setNewCategoryErrorMessage("");

    if (newCategoryName) {
      for (let i = 0; i < props.cookieCategories.length; i++) {
        if (props.cookieCategories[i].categoryName === newCategoryName) {
          setNewCategorError(true);
          setNewCategoryErrorMessage("Category is already exist.");
          return;
        }
      }
      saveNewCategory();
      return;
    }
    setNewCategorError(true);
    setNewCategoryErrorMessage("Text feild can not be empty.");
  }

  async function saveNewCategory() {
    try {
      let websiteId = props.websiteId;
      let categoryName = newCategoryName;
      const response = await axios.post(
        `http://localhost:8080/api/v1/${websiteId}/addCookieCategory`,
        { categoryName }
      );
      setNewCategoryName(null);
      console.log(response.data);
      if (response.data !== null) {
        props.addNewCookieCategory(response.data);
      }
      props.handleCloseAddCategoryDialog();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#00A5FF", mb: 1 }}
        onClick={props.handleOpenAddCategoryDialog}
      >
        Add Category
      </Button>
      <Dialog
        open={props.isOpenAddCategoryDialog}
        onClose={props.handleCloseAddCategoryDialog}
      >
        <DialogTitle sx={{ color: "#004587", fontWeight: "600" }}>
          {" "}
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
            onChange={handleChangeNewCategory}
            error={newCategoryError}
            helperText={newCategoryErrorMessage}
          />
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button
            onClick={props.handleCloseAddCategoryDialog}
            sx={{ bgcolor: "#00A5FF", color: "white" }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveButtonClick}
            sx={{ bgcolor: "#00A5FF", color: "white" }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
