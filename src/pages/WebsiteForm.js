import React from "react";
import { Box, Typography } from "@mui/material";

import BasicTabs from "../components/website-management/website-form-components/tab-panel/BasicTabs";

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
        Customize your website's cookie and banner settings effortlessly.
      </Typography>
      <Box sx={{ pt: 5 }}>
        <BasicTabs />
      </Box>
    </Box>
  );
}
