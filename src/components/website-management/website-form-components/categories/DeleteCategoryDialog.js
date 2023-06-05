import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteCategoryDialog(props) {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
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
          <Button autoFocus onClick={props.handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={props.handleDeleteClick}
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
