import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { BannerContext } from "./BannerContext";
import CustSelectBoxBanner from "./customization-common components/SelectBoxBanner";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CookieSettingsDialog from "./CookieSettingDialog";
import BannerContentSelectBox from "./customization-common components/BannerContentSelectBox";
import baseUrl from "../../../../../config";

const CookieBannner = () => {

  const passedId = useContext(BannerContext).websiteId;
  const { setColor, setTop, setLeft, setChosenCont, color, textColor, setTextColor} = useContext(BannerContext);

  const [templates, settemplates] = useState([]);
  const [banner, setBanner] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const [alignmentValue, setAlignmentValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [textColorValue, setTextColorValue] = useState("");

  /*Sanck bar useStates*/
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleCustomizeClick = () => {
    setShowDialog((prevShowDialog) => !prevShowDialog);
  };

  const loadTemplates = async () => {
    try {
      const websiteID = passedId;
      const result = await axios.get(
          `${baseUrl}/api/v1/templates/${websiteID}`
      );
      settemplates(result.data);

      if (Object.keys(selectedTemplate).length !== 0) {
        const template = result.data.find(
            (t) => t.templateName === selectedTemplate?.templateName
        );
        setSelectedTemplate(template);
      } else {
        const template = result.data[0];
        setSelectedTemplate(template);
      }
    }
    catch (error) {
      console.error("Error loading banners: ", error);
    }
  };

  const laodBanner = async () => {

    try {
      const websiteId = passedId;
      const response = await axios.get(
        `${baseUrl}/api/v1/banners/${websiteId}`
      );
      const result = response.data;
      setBanner(result);

      const { bannerPosition, bannerColor, bannerAlignment,bannerTextColor } = result;
      setPositionValue(bannerPosition);
      handleChangeTop(bannerPosition);
      handleChangeHorizontal(bannerAlignment);
      handleChangeColor(bannerColor);
      handleChangeTextColor(bannerTextColor);
    } catch (error) {
      console.error("Error loading banners:", error);
    }
  };

  useEffect(() => {
    loadTemplates();
    laodBanner();
  }, []);

  const templateValues =
    templates?.length > 0
      ? templates.map((template) => ({
          id: template.templateId,
          value: template.templateName,
        }))
      : [];


  const choosenTemplate = (e) => {
    const selectedRegulation = e.target.value;
    let chosenCont = null;

    for (let i = 0; i < templates.length; i++) {
      if (templates[i].templateName === selectedRegulation) {
        chosenCont = templates[i].templateContent;
        break;
      }
    }

    const template = templates.find(
      (t) => t.templateName === e.target.value
    );
    setSelectedTemplate(template);
    setChosenCont(chosenCont);
  };

  function handleChangeTop(value) {
    if (value === "Top") {
      setTop(10);
      setPositionValue(value);
    }
    if (value === "Bottom") {
      setTop(280);
      setPositionValue(value);
    }
  }

  function handleChangeHorizontal(value) {
    if (value === "Left") {
      setLeft(10);
      setAlignmentValue(value);
    }
    if (value === "Center") {
      setLeft(240);
      setAlignmentValue(value);
    }
    if (value === "Right") {
      setLeft(475);
      setAlignmentValue(value);
    }
  }
  function handleChangeColor(value) {
    if (value === "Light Blue" || value === "#25acc6") {
      setColor("#25acc6");
      setColorValue("Light Blue");
    }
    if (value === "Light Gray" || value === "#34495E") {
      setColor("#34495E");
      setColorValue("Light Gray");
    }
    if (value === "Dark Blue" || value === "#263347") {
      setColor("#263347");
      setColorValue("Dark Blue");
    }
  }

  function handleChangeTextColor(value) {
    if (value === "Black" || value === "#000000") {
      setTextColor("#000000");
      setTextColorValue("Black");
    }
    if (value === "White" || value === "#ffffff") {
      setTextColor("#ffffff");
      setTextColorValue("White");
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(false);
    setErrorMessage("");
  };
  async function handlesave() {

    const websiteID = passedId;

    const bannerSave = {
      bannerPosition: positionValue,
      bannerColor: color,
      bannerAlignment: alignmentValue,
      bannerTextColor: textColor
    };

    try {
      const response = await axios.put(
        `${baseUrl}/api/v1/banners/${websiteID}`,
        bannerSave
      );
      setSnackbarMessage("Save Completed!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving banner: ", error.response.data.message);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  }

  const bannerPosition = [
    { id: 1, value: "Top" },
    { id: 2, value: "Bottom" },
  ];

  const bannerAlignment = [
    { id: 1, value: "Left" },
    { id: 2, value: "Center" },
    { id: 3, value: "Right" },
  ];

  const bannerColor = [
    { id: 1, value: "Dark Blue" },
    { id: 2, value: "Light Gray" },
    { id: 3, value: "Light Blue" },
  ];

  const bannerTextColor = [
    { id: 1, value: "Black" },
    { id: 2, value: "White" },
  ];

  return (
    <div className={"Cookie-Banner"}>
      <Box
        sx={{
          backgroundColor: "#fefefe",
          width: "450px",
          height: "650px",
          align: "center",
          margin: 3,
          paddingTop: 5,
          paddingLeft: 5,
          borderRadius: 5,
          boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
          mb: 8,
        }}
      >
        <Typography
          variant={"h5"}
          sx={{ color: "#00a5ff", pb: { lg: 3, md: 3, sm: 3, xs: 3 } }}
          fontWeight={"Bold"}
        >
          Cookie Banner
        </Typography>
        <div style={{ paddingTop: 30, paddingBottom: 10, paddingLeft: 15 }}>
          <BannerContentSelectBox
              name={"Banner Content"}
              items={templateValues}
              width={300}
              fun={choosenTemplate}
              selectedTemplate={selectedTemplate}
          ></BannerContentSelectBox>
        </div>
        {/*templates[0].templateName*/}
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
          <CustSelectBoxBanner
            name={"Banner Position"}
            fun={handleChangeTop}
            items={bannerPosition}
            width={300}
            defaultValue={positionValue}
          />
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
          <CustSelectBoxBanner
            name="Banner Alignment"
            fun={handleChangeHorizontal}
            items={bannerAlignment}
            width={300}
            defaultValue={alignmentValue}
          />
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
          <CustSelectBoxBanner
            name="Banner Colour"
            fun={handleChangeColor}
            items={bannerColor}
            width={300}
            defaultValue={colorValue}
          />
        </div>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
          <CustSelectBoxBanner
              name="Banner Text Colour"
              fun={handleChangeTextColor}
              items={bannerTextColor}
              width={300}
              defaultValue={textColorValue}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 20,
            paddingRight: 60,
          }}
        >
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" onClick={handleCustomizeClick}>
              Customize Settings
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={handlesave}>
              Save Banner
            </Button>
          </div>
          <CookieSettingsDialog open={showDialog} onClose={handleCloseClick} />
        </div>

        <Snackbar
          open={snackbarOpen || error}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={error ? "error" : "success"}
          >
            {error ? errorMessage : snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default CookieBannner;
