import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DeleteCookieDialog(props) {
  return (
    <Box>
      <Dialog open={props.isOpen} onClose={props.handleClose}>
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
              ? ' "' + props.cookieToDelete.cookieName + "'"
              : ""}{" "}
            Cookie? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button autoFocus onClick={props.handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={props.handleDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
