import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function DeleteCategoryDialogBox(props) {
  async function handleDeleteButtonClick() {
    try {
      let websiteId = props.websiteId;
      let categoryId = props.categoryToDelete.categoryId;
      const response = await axios.delete(
        `http://localhost:8080/api/v1/${websiteId}/${categoryId}/deleteCategory`
      );
      if (response.data) {
        props.removeCategory(categoryId);
        props.handleDeleteCategoryCancel();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <Dialog
        open={props.isOpenDeleteCategoryDialog}
        onClose={props.handleDeleteCategoryCancel}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
          sx={{ color: "#004587", fontWeight: "600" }}
        >
          Delete Category
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            Are you sure you want to delete
            {props.categoryToDelete
              ? '"' + props.categoryToDelete.categoryName + "'"
              : ""}{" "}
            category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button
            autoFocus
            onClick={props.handleDeleteCategoryCancel}
            sx={{ bgcolor: "#00A5FF", color: "white" }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteButtonClick}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
