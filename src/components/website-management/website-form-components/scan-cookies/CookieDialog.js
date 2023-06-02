import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, MenuItem } from "@mui/material";

export default function CookieDialog(props) {
  const [cookie, setCookie] = React.useState({
    cookieId: null,
    cookieName: "",
    domain: "",
    path: "",
    durationUnit: "",
    expireDuration: "",
  });
  const { cookieName, domain, path, durationUnit, expireDuration } = cookie;

  const units = ["Minutes", "Hours", "Days", "Weeks", "Months", "Years"];

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
      <Dialog open={props.isOpen} onClose={props.handleClose} maxWidth="md">
        <DialogTitle sx={{ color: "#004587", fontWeight: "600" }}>
          {cookie.cookieId ? "Edit Cookie" : "Add New Cookie"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
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
            name="domain"
            value={domain ? domain : ""}
            onChange={handleOnChange}
          />
          <TextField
            autoComplete="off"
            label="Path"
            sx={{ mt: 2 }}
            variant="outlined"
            size="small"
            name="path"
            value={path ? path : ""}
            onChange={handleOnChange}
          />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              autoComplete="off"
              type="number"
              label="Cookie Duration"
              sx={{ mt: 2 }}
              variant="outlined"
              size="small"
              name="expireDuration"
              value={expireDuration ? expireDuration : ""}
              onChange={handleOnChange}
            />
            <TextField
              select
              label="Duration Unit"
              sx={{ mt: 2, ml: 1 }}
              size="small"
              name="durationUnit"
              value={durationUnit ? durationUnit : units[0]}
              onChange={handleOnChange}
            >
              {units.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: "24px", pb: "16px" }}>
          <Button onClick={props.handleClose} variant="outlined">
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
