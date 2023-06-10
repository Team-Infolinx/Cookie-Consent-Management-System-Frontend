import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const PopUp = (props) => {
  const { openPopup, handleClose, data, getTemps } = props;

  const [textBox01, setTextBox01] = useState();

  const [textBox02, setTextBox02] = useState();

  const [textBox03, setTextBox03] = useState();

  const [textBox04, setTextBox04] = useState();

  const [templateNameError, setTemplateNameError] = useState(false);
  const [errorMessageTemplateName, setErrorMessageTemplateName] = useState("");

  const [templateLengthCheckError, settemplateLengthCheckError] = useState(false);
  const [errorTemplateLength, setErrorTemplateLength] = useState("");

  const [cookiePolicyError, setCookiePolicyError] = useState(false);
  const [errorMessageCookiePolicy, setErrorMessageCookiePolicy] = useState("");

  const [contentError, setContentError] = useState(false);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const [contentLengthCheckError, setcontentLengthCheckError] = useState(false);
  const [errorContentLength, setErrorContentLength] = useState("");

  const template = {
    templateName: textBox01,
    templateRegulation: textBox02,
    templatePrivacyPolicyLink: textBox03,
    templateContent: textBox04,
  };

  function isValidDomain(domain) {
    const pattern =
        /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/;
    return pattern.test(domain);
  }
  const handleSave = async () => {
    if (!textBox01) {
      setTemplateNameError(true);
      setErrorTemplateLength("Template name should not be empty");
      return;
    }

    if (textBox01.length > 20) {

      settemplateLengthCheckError(true);
      setErrorMessageTemplateName("Template name shouldn't exceed 20 characters");
      return;
    }

    if (textBox03 !== "") {
      if (isValidDomain(textBox03) === false) {
        setCookiePolicyError(true);
        setErrorMessageCookiePolicy("Enter a valid domain");
        return;

      }
    }

    if (!textBox03){
      setCookiePolicyError(true);
      setErrorMessageCookiePolicy("Cookie policy can't be empty");
      return;
    }

    if (!textBox04){
      setContentError(true);
      setErrorMessageContent("Content can't be empty");
      return;
    }

    if (textBox04.length > 200){
      setcontentLengthCheckError(true);
      setErrorContentLength("Content should not exceed 200 characters");
      return;
    }
    else {
      const id = data.templateId;
      await axios
          .put(
              `http://localhost:8080/api/v1/templates/${id}`,
              template
          )
          .then(() => getTemps());

      handleClose();
      setTemplateNameError(false);
      settemplateLengthCheckError(false);
      setCookiePolicyError(false);
      setContentError(false);
      setcontentLengthCheckError(false);

    }
  };

  useEffect(() => {
    if (data) {
      setTextBox01(data.templateName);
      setTextBox02(data.templateRegulation);
      setTextBox03(data.templatePrivacyPolicyLink);
      setTextBox04(data.templateContent);
    }
  }, [data]);

  return (
    <div className={"dialog-box"}>
      <Dialog open={openPopup} fullWidth>
        <DialogTitle>
          <div
            className={"dialogTitle-container"}
            style={{
              flexDirection: "row",
              backgroundColor: "#ccfefd",
              padding: 5,
              paddingTop: 8,
              height: "50px",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: 5,
            }}
          >
            <div style={{ float: "left" }}>
              <Typography
                variant={"h6"}
                sx={{ color: "#004587", fontWeight: "bold" }}
              >
                Cookie Template
              </Typography>
            </div>
            <div style={{ float: "right" }}>
              <Button
                onClick={handleClose}
                startIcon={<CancelIcon />}
                sx={{ color: "red" }}
              >
                {" "}
              </Button>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div
            className={"dialogContent-container"}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Template Name"
                variant="outlined"
                value={textBox01}
                onChange={(e) => setTextBox01(e.target.value)}
                error={templateNameError}
                helperText={errorMessageTemplateName}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Privacy Regulation Type"
                value={textBox02}
                onChange={(e) => setTextBox02(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Cookie policy link"
                value={textBox03}
                onChange={(e) => setTextBox03(e.target.value)}
                error={cookiePolicyError}
                helperText={errorMessageCookiePolicy}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Content"
                variant="outlined"
                value={textBox04}
                onChange={(e) => setTextBox04(e.target.value)}
                multiline={true}
                error={contentError || contentLengthCheckError}
                helperText={errorMessageContent || errorContentLength}
              />
            </div>
          </div>
          {/*sx={{width:'50ch'}}*/}
        </DialogContent>
        <DialogActions>
          <div
            className={"dialogTitle-container"}
            style={{
              flexDirection: "row",
              height: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ float: "right", paddingRight: 10 }}>
              <Button variant={"contained"} onClick={handleSave}>
                Save
              </Button>
            </div>
            <div style={{ float: "right", paddingRight: 8 }}>
              <Button variant={"contained"} onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUp;
