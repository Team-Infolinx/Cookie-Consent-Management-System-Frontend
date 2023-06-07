import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const CusPopUp = (props) => {
  const { openPopup, handleClose, data, getTemps } = props;

  const [textBox01, setTextBox01] = useState();

  const [textBox02, setTextBox02] = useState();

  const [textBox03, setTextBox03] = useState();

  const template = {
    templateName: textBox01,
    templateRegulation: textBox02,
    templateContent: textBox03,
  };

  const handleSave = async () => {
    const id = data.templateId;
    await axios
      .put(
        `http://localhost:8080/api/template/updateTemplateID/${id}`,
        template
      )
      .then(() => getTemps());

    handleClose();
  };

  useEffect(() => {

    if (data) {
      setTextBox01(data.templateName);
      setTextBox02(data.templateRegulation);
      setTextBox03(data.templateContent);
    }
  }, [data]);

  return (
    <div className={"dialog-box"}>
      <Dialog open={openPopup} maxWidth={"lg"}>
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
            style={{
              flexDirection: "row",
              width: "800px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                sx={{ width: "50ch" }}
                id={data.templateId}
                label="Template Name"
                variant="outlined"
                value={textBox01}
                onChange={(e) => setTextBox01(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                sx={{ width: "50ch" }}
                id={data.templateId}
                label="Privacy Regulation Type"
                value={textBox02}
                onChange={(e) => setTextBox02(e.target.value)}
              />
            </div>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TextField
                sx={{ width: "50ch" }}
                id={data.templateId}
                label="Content"
                variant="outlined"
                value={textBox03}
                onChange={(e) => setTextBox03(e.target.value)}
                multiline={true}
              />
            </div>
          </div>
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

export default CusPopUp;
