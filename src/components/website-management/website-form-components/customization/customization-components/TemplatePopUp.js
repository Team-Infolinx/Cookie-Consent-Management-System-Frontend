import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const TemplatePopUp = (props) => {

  const { openPopup, handleClose, data, getTemps } = props;

  const [templateName_Box01, setTemplateName_Box01] = useState();

  const [templateRegulation_Box02, setTemplateRegulation_Box02] = useState();

  const [cookiePolicy_Box03, setCookiePolicy_Box03] = useState();

  const [content_Box04, setContent_Box04] = useState();

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
    templateName: templateName_Box01,
    templateRegulation: templateRegulation_Box02,
    templatePrivacyPolicyLink: cookiePolicy_Box03,
    templateContent: content_Box04,
  };

  function isValidDomain(domain) {
    const pattern =
        /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/;
    return pattern.test(domain);
  }

  const handleSave = async () => {

    if (!templateName_Box01) {
      setTemplateNameError(true);
      setErrorTemplateLength("Template name should not be empty");
      return;
    }

    if (templateName_Box01.length > 20) {

      settemplateLengthCheckError(true);
      setErrorMessageTemplateName("Template name shouldn't exceed 20 characters");
      return;
    }

    if (cookiePolicy_Box03 !== "") {
      if (isValidDomain(cookiePolicy_Box03) === false) {
        setCookiePolicyError(true);
        setErrorMessageCookiePolicy("Enter a valid domain");
        return;

      }
    }

    if (!cookiePolicy_Box03){
      setCookiePolicyError(true);
      setErrorMessageCookiePolicy("Cookie policy can't be empty");
      return;
    }

    if (!content_Box04){
      setContentError(true);
      setErrorMessageContent("Content can't be empty");
      return;
    }

    if (content_Box04.length > 200){
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
      setTemplateName_Box01(data.templateName);
      setTemplateRegulation_Box02(data.templateRegulation);
      setCookiePolicy_Box03(data.templatePrivacyPolicyLink);
      setContent_Box04(data.templateContent);
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
                value={templateName_Box01}
                onChange={(e) => setTemplateName_Box01(e.target.value)}
                error={templateNameError || templateLengthCheckError}
                helperText={errorMessageTemplateName || errorTemplateLength}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Privacy Regulation Type"
                value={templateRegulation_Box02}
                onChange={(e) => setTemplateRegulation_Box02(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                fullWidth
                id={String(data.templateId)}
                label="Cookie policy link"
                value={cookiePolicy_Box03}
                onChange={(e) => setCookiePolicy_Box03(e.target.value)}
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
                value={content_Box04}
                onChange={(e) => setContent_Box04(e.target.value)}
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

export default TemplatePopUp;
