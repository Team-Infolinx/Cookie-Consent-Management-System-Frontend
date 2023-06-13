import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { BannerContext } from "./BannerContext";
import CookieSettingsDialog from "./CookieSettingDialog";

const CookieBannerPreview = () => {
  const { top, left, color, chosenCont,textColor } = useContext(BannerContext);
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleCustomizeClick = () => {
    setShowDialog(true);
  };

  return (
    <Grid>
      <Grid
        container
        item
        direction="column"
        justify="center"
        xs={9}
        lg={9}
        xl={9}
      >
        <div
          style={{
            width:"700px",
            height: "600px",
            backgroundColor: "white",
            padding: 15,
            position: "relative",
            border: " 5px solid #00a5ff",
            borderRadius: 10,
          }}
        >
          <div
            id="cookie-banner"
            style={{
              // width: "400px",
              // height: "300px",
              width: "350px",
              height: "250px",
              backgroundColor: color,
              alignSelf: "right",
              position: "absolute",
              top: top,
              left: left,
              bottom: 0,
              borderRadius: 10,
              boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
                padding:10,
              alignItems:"left",
            }}
          >
            <div id="cookie-message" >
              <h5
                style={{
                  fontWeight: "bold",
                  color: textColor,
                  fontSize: "15px",
                  paddingLeft: 20,
                }}
              >
                Your privacy
              </h5>
              <h6
                style={{
                  color: textColor,
                  fontSize: "11px",
                  marginBottom: "5px",
                  paddingLeft: 20,
                  paddingRight: 5,
                }}
              >
                {chosenCont}
              </h6>
            </div>
            <div
              id="cookie-buttons"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
                  alignContent:"space-around",justifyContent:"flex-start",
              }}
            >
              <div style={{ display: "flex", marginBottom: "10px",alignContent:"space-around",justifyContent:"flex-start", alignItems:"center",paddingLeft:0}}>
                <Button
                  name={"Accept all cookies"}
                  style={{
                    /*marginLeft:-5,*/
                    marginRight: 17,
                    backgroundColor: "#0077dd",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    fontSize: "11px",
                    cursor: "pointer",
                    width:  "8pc",
                  }}
                >
                  Accept all
                </Button>
                <Button
                  name={"Necessary cookies only"}
                  style={{
                    /*marginLeft:50,*/
                    backgroundColor: "#0077dd",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    fontSize: "11px",
                    cursor: "pointer",
                      // width:  "50%",
                      width:  "8pc",

                  }}
                >
                  Reject All
                </Button>
              </div>
              <Button
                name={"Customize settings"}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0077dd",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: "11px",
                  cursor: "pointer",
                  width: "85%",
                }}
                onClick={handleCustomizeClick}
              >
                Customize settings
              </Button>
            </div>
            <CookieSettingsDialog
              open={showDialog}
              onClose={handleCloseClick}
            />
          </div>
        </div>
        <Typography
          variant={"h6"}
          sx={{ color: "#00A5FF", pb: { lg: 3, md: 3, sm: 3, xs: 3 } }}
          fontWeight={"Bold"}
          align={"center"}
        >
          Banner Preview
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CookieBannerPreview;
