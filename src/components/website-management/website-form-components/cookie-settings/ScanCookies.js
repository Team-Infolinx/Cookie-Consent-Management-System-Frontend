import React from "react";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { Box, Button, Typography } from "@mui/material";

export default function ScanCookies() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        mb: "24px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Scan Website for Cookies:
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        Please click on the "Scan Cookies" button below to automatically scan
        for cookies on your website.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 1, bgcolor: "#00A5FF", mb: 1 }}
        startIcon={<DocumentScannerIcon />}
      >
        Scan Cookies
      </Button>
    </Box>
  );
}
