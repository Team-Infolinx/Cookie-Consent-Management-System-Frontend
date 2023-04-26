import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

export default function DeleteCookieDialogBox(props) {
  return (
    <div>
      <Dialog
        open={props.isOpenDeleteCookieDialog}
        onClose={props.handleDeleteCookieCancel}
      >
        <DialogTitle
          style={{ cursor: "move" }}
          sx={{ color: "#004587", fontWeight: "600" }}
        >
          Delete Cookie
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            Are you sure you want to delete
            {props.cookieToDelete
              ? '"' + props.cookieToDelete.cookieName + "'"
              : ""}{" "}
            Cookie? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button
            autoFocus
            onClick={props.handleDeleteCookieCancel}
            sx={{ bgcolor: "#00A5FF", color: "white" }}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleDeleteClickInDialog}
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
