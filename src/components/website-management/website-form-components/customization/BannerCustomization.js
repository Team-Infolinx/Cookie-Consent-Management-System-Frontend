import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import CustomizationTabs from "./CustomizationTabs";
import BannerTemplate from "./customization-components/BannerTemplate";
import CookieBanner from "./customization-components/CookieBanner";
import { Box } from "@mui/system";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
const BannerCustomization = (props) => {
  const { websiteId } = props;

  const [component, setComponent] = useState(<BannerTemplate />);
  const [value, setValue] = useState(0);
  const handleNextClick = () => {
    setComponent(<CookieBanner />);
    setValue(1);
  };
  const handleBackClick = () => {
    setComponent(<BannerTemplate />);
    setValue(0);
  };

  return (
    <Grid
      className={"customization"}
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <Grid className={"tab-tools"} container item direction="column" lg={4}>
        {component}
        <Box
          sx={{
            marginLeft: 3,
            marginTop: "-32px",
            paddingTop: 5,
            paddingLeft: 23,
            height: "115px",
            width: "450px",
            backgroundColor: "#fefefe",
            boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 5,
          }}
        >
          <Button
            variant={"outlined"}
            style={{ width: "100px", marginRight: 10 }}
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Button
            variant={"contained"}
            style={{ width: "100px" }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      </Grid>

      <Grid
        className={"customization-tabs"}
        container
        item
        direction="column"
        justify={"center"}
        lg={8}
        sx={{ paddingTop: 0 }}
      >
        <Box
          sx={{
            backgroundColor: "#fefefe",
            width: "110vh",
            minHeight: "800px",
            align: "center",
            margin: 3,
            paddingTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 5,
            boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
            mb: 8,
          }}
        >
          <CustomizationTabs value={value} setValue={setValue} />
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: 3,
            marginTop: -5,
          }}
        >
          <Button
            startIcon={<ArrowBackIosNewOutlinedIcon />}
            onClick={props.handleBackTab}
            sx={{ paddingLeft: 90 }}
          >
            Back
          </Button>
          <Button
            endIcon={<NavigateNextOutlinedIcon />}
            variant="contained"
            sx={{ bgcolor: "#00A5FF" }}
            onClick={props.handleNextTab}
          >
            Save Changes
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default BannerCustomization;
