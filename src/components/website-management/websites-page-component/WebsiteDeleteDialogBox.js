import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function WebsiteDeleteDialogBox(props) {
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
          Delete Website
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            Are you sure you want to delete this "
            {props.deletingWebsite ? props.deletingWebsite.configName : ""}"
            website? This action will permanently delete all associated cookies
            and their categories, as well as any cookie banner regulation
            configurations. Please note that this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button autoFocus onClick={props.handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={props.handleDeleteWebsiteClick}
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
