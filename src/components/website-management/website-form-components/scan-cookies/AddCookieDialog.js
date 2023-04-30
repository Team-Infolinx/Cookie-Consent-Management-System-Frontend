import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box } from "@mui/material";

export default function AddCookieDialog(props) {
  const [cookie, setCookie] = React.useState({
    cookieId: "",
    cookieName: "",
    domain: "",
    path: "",
    expireDate: "",
  });

  const [cookieNameError, setCookieNameError] = React.useState(false);
  const [cookieNameErrorMessage, setCookieNameErrorMessage] =
    React.useState("");

  const { cookieName, domain, path, expireDate } = cookie;

  function handleInputChanges(event) {
    setCookie({
      ...cookie,
      [event.target.name]: event.target.value,
    });
  }

  function handleSaveButtonClick() {
    setCookieNameError(false);
    setCookieNameErrorMessage("");

    if (cookieName === "" || cookieName === null) {
      setCookieNameError(true);
      setCookieNameErrorMessage("Cookie name can not be empty.");
      return;
    }
    saveNewCookie();
    handleCancel();
  }

  function handleCancel() {
    setCookie({
      cookieName: "",
      domain: "",
      path: "",
      expireDate: "",
    });
    setCookieNameError(false);
    setCookieNameErrorMessage("");
    props.handleCloseAddCookieDialog();
  }

  async function saveNewCookie() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.post(
        `http://localhost:8080/api/v1/${websiteId}/addCookie`,
        cookie
      );
      console.log("before check for null:" + JSON.stringify(response.data));
      if (response.data) {
        console.log("response data. data is not null", response.data);
        props.addNewCookie(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#00A5FF", mb: 1 }}
        onClick={props.handleOpenAddCookieDialog}
      >
        Add Cookie
      </Button>
      <Dialog
        open={props.isOpenAddCookieDialog}
        onClose={handleCancel}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle sx={{ color: "#004587", fontWeight: "600" }}>
          {" "}
          Add New Cookie
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#004587" }}>
            Please enter your cookie details.
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
            onClick={handleCancel}
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
    </Box>
  );
}
