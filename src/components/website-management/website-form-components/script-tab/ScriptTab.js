import { Box, Button, IconButton, Typography } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React from "react";

export default function ScriptTab() {
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
          <IconButton variant="outlined" sx={{ color: "#004587" }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box>
          <Typography>This is the script of theh site</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<ArrowBackIosNewOutlinedIcon />}>Back</Button>
        <Button
          endIcon={<NavigateNextOutlinedIcon />}
          variant="contained"
          sx={{ bgcolor: "#00A5FF" }}
        >
          Finish
        </Button>
      </Box>
    </Box>
  );
}
