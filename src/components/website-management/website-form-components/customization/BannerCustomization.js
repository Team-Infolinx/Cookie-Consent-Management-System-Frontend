import { Button, Grid,} from "@mui/material";
import React, { useState } from "react";
import CustomizationTabs from "./CustomizationTabs";
import BannerTemplate from "./customization-components/BannerTemplate";
import CookieBanner from "./customization-components/CookieBanner";
import { Box } from "@mui/system";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
const BannerCustomization = (props) => {

  const [component, setComponent] = useState(<BannerTemplate />);
  const [value, setValue] = useState(0);

  const handleNextClick = () => {
    setValue(1);
  };

  const handleBackClick = () => {
    setValue(0);
  };

  return (
    <Grid
      className="customization"
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <Grid className={"tab-tools"} container item direction="column" lg={4}>
        {/*{component}*/}
          {value === 0 ? <BannerTemplate /> : <CookieBanner />}
        <Box
          sx={{
            marginLeft: 3,
            marginTop: "-32px",
            paddingTop: 5,
            paddingLeft: 5,
            height: "115px",
            width: "450px",
            backgroundColor: "#fefefe",
            boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 5,
            alignItems:"center"
          }}
        >

          <Button
            variant={"outlined"}
            style={{ width: "140px", marginRight: 70 }}
            onClick={handleBackClick}
            startIcon={<ArrowBackIosNewOutlinedIcon />}
          >
            Templates
          </Button>
          <Button
            variant={"contained"}
            style={{ width: "140px" }}
            onClick={handleNextClick}
            endIcon={<NavigateNextOutlinedIcon />}
          >
            Banner
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
        sx={{ paddingTop: 0,mb:0 }}

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
      </Grid>
        <Grid className={"tab-control-buttons"} container item direction="column" xl={12} lg={12}>
            <Box sx={{ mt: 0, display: "flex", justifyContent: "space-between",paddingRight:"-1000px",paddingLeft:"10px",}}>
                <Button
                    startIcon={<ArrowBackIosNewOutlinedIcon />}
                    onClick={props.handleBackTab}
                >
                    Back
                </Button>
                <Button
                    endIcon={<NavigateNextOutlinedIcon />}
                    variant="contained"
                    sx={{ bgcolor: "#00A5FF"}}
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
