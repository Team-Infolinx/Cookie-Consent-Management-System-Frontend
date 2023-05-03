import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function CookieDialog(props) {
  const [cookie, setCookie] = React.useState({
    cookieId: null,
    cookieName: "",
    domain: "",
    path: "",
    expireDate: "",
  });
  const { cookieName, domain, path, expireDate } = cookie;

  const [cookieNameError, setCookieNameError] = React.useState(false);
  const [cookieNameErrorMessage, setCookieNameErrorMessage] =
    React.useState("");

  React.useEffect(() => {
    if (props.cookie) {
      setCookie(props.cookie);
    }
  }, [props.cookie]);

  function handleOnChange(event) {
    setCookie({ ...cookie, [event.target.name]: event.target.value });
  }

  function handleSaveButtonClick() {
    setCookieNameError(false);
    setCookieNameErrorMessage("");

    if (cookieName === "" || cookieName === null) {
      setCookieNameError(true);
      setCookieNameErrorMessage("Cookie name can not be empty.");
      return;
    }
    props.handleSaveClick(cookie);
    props.handleClose();
  }

  return (
    <Box>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle sx={{ color: "#004587", fontWeight: "600" }}>
          {cookie.cookieId ? "Edit Cookie" : "Add New Cookie"}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
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
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button
            onClick={props.handleClose}
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
