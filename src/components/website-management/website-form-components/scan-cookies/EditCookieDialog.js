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
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditCookieDialog(props) {
  const [cookie, setCookie] = useState({});
  const { cookieName, domain, path, expireDate } = cookie;

  useEffect(() => {
    if (props.cookieToEdit) {
      setCookie(props.cookieToEdit);
    }
  }, [props.cookieToEdit]);

  const [cookieNameError, setCookieNameError] = useState(false);
  const [cookieNameErrorMessage, setCookieNameErrorMessage] = useState("");

  function handleInputChanges(event) {
    setCookie({
      ...cookie,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSaveClick() {
    try {
      console.log("cookie : ", cookie);
      const response = await axios.put(
        `http://localhost:8080/api/v1/updateCookie`,
        cookie
      );
      console.log("Data : ", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <DialogTitle
          style={{ cursor: "move" }}
          sx={{ color: "#004587", fontWeight: "600" }}
        >
          Edit Cookie
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            Are you sure you want to edit
            {/* {props.cookieToDelete
              ? ' "' + props.cookieToDelete.cookieName + "'"
              : ""}{" "} */}
            Cookie? This action cannot be undone.
          </DialogContentText>
          <TextField
            required
            autoComplete="off"
            label="Cookie Name"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="cookieName"
            value={cookieName}
            onChange={handleInputChanges}
            error={cookieNameError}
            helperText={cookieNameErrorMessage}
          />
          <TextField
            autoComplete="off"
            label="Domain"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="domain"
            value={domain}
            onChange={handleInputChanges}
          />
          <TextField
            autoComplete="off"
            label="Path"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="path"
            value={path}
            onChange={handleInputChanges}
          />
          <TextField
            disabled
            autoComplete="off"
            label="Expire Date"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            fullWidth
            name="expireDate"
            value={expireDate}
            onChange={handleInputChanges}
          />
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button
            autoFocus
            onClick={() => console.log("clicked")}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="error" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
