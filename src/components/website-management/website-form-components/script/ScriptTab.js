import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";

export default function ScriptTab(props) {
  const [script, setScript] = useState("");

  useEffect(() => {
    if (props.websiteId) {
      setScript(
        `<script\n  src="https://team-infolinx.github.io/Websafe-Script/script/cookie-banner.js?"\n  websiteId=${props.websiteId}\n></script>`
      );
    }
  }, [props.websiteId]);

  // Hanlde copy the text icon click.
  const handleCopyScript = () => {
    navigator.clipboard
      .writeText(script)
      .then(() => {
        console.log("Script copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying script to clipboard:", error);
      });
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Cookie Banner Script
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        Please copy the following script and paste it into your website's
        relevant place to display the banner:
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: "#00A5FF",
          pt: 1,
          pb: 2,
          pr: 1,
          pl: 1,
          mt: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }} color="#004587">
            script
          </Typography>
          <IconButton
            variant="outlined"
            sx={{ color: "#004587" }}
            onClick={handleCopyScript}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <TextField
            disabled
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={script}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<ArrowBackIosNewOutlinedIcon />}
          onClick={props.handleBackTab}
        >
          Back
        </Button>
        <Link to={"/user/websites"}>
          <Button
            endIcon={<NavigateNextOutlinedIcon />}
            variant="contained"
            sx={{ bgcolor: "#00A5FF" }}
          >
            Finish
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
