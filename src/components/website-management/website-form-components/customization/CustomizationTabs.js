import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BannerTemplateTable from "./customization-components/BannerTemplateTable";
import CookieBannerPreview from "./customization-components/CookieBannerPreview";

export default function CustomizationTabs({ value, setValue }) {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: {xl:"730px" , lg:"400px",md:"300px"}}}>
      {/* sx={{ bgcolor: "background.paper", width: {xl:"1000px" , lg:"400px",md:"300px"}}} */}
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Banner Template" />
          <Tab label="Cookie Banner" />
        </Tabs>
      </AppBar>
      <div role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <BannerTemplateTable />
          </Box>
        )}
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <CookieBannerPreview />
          </Box>
        )}
      </div>
    </Box>
  );
}
