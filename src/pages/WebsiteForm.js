import React from "react";
import BasicTabs from "../components/website-management/website-form-components/tab-panel/BasicTabs";
import { Box, Typography } from "@mui/material";

export default function WebsiteForm() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography
        variant="h5"
        sx={{ color: "#004587", fontWeight: "900", mb: 2 }}
      >
        Configuration for Your Website...
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        Please fill out the form below to configure your website's cookie and
        banner settings.
      </Typography>
      <Box sx={{ pt: 5 }}>
        <BasicTabs />
      </Box>
    </Box>
  );
}
