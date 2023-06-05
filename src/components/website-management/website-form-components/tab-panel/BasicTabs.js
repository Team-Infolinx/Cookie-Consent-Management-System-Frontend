import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GeneralSettings from "../general-settings/GeneralSettings";
<<<<<<< Updated upstream
import CookieSettings from "../cookie-settings/CookieSettings";
import { useLocation } from "react-router-dom";
import PrivacyRegulation from "../privacy-regulation-settings/PrivacyRegulation";
import BannerCustomization from "../customization/BannerCustomization";
=======
import CookiesTab from "../cookies/CookiesTab";
import Categories from "../categories/Categories";
// import BannerCustomization from "../customization/BannerCustomization";
import PrivacyRegulation from "../privacy-regulation-settings/PrivacyRegulation";
import ScriptTab from "../script/ScriptTab";
>>>>>>> Stashed changes

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle tab movement.
  function handleNextTab() {
    setValue(value + 1);
  }

  function handleBackTab() {
    setValue(value - 1);
  }
  //   END.

  // WebsiteId and UserID.
  const { state } = useLocation();
  const [websiteId, setWebsiteId] = React.useState("");
  const userId = 1000;

  React.useEffect(() => {
    state ? console.log(true) : console.log(false);
    if (state !== null) {
      console.log(state.websiteId);
      setWebsiteId(state.websiteId);
    }
  }, [state]);

  // To set WebsiteId when configuring new websites.
  function handleWebsiteId(newWebsiteId) {
    setWebsiteId(newWebsiteId);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* {console.log(state.websiteId)} */}
        <Tabs value={value} onChange={handleChange}>
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Cookie Settings" {...a11yProps(1)} />
          <Tab label="Privacy Regulation" {...a11yProps(2)} />
          <Tab label="Customization" {...a11yProps(3)} />
          <Tab label="Script" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{ mt: 3, p: 4 }}>
        <GeneralSettings
          userId={userId}
          websiteId={websiteId}
          handleWebsiteId={handleWebsiteId}
          handleNextTab={handleNextTab}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CookieSettings websiteId={websiteId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PrivacyRegulation />
      </TabPanel>
      <TabPanel value={value} index={3}>
<<<<<<< Updated upstream
       <BannerCustomization />
=======
        <PrivacyRegulation
          websiteId={websiteId}
          handleNextTab={handleNextTab}
          handleBackTab={handleBackTab}
        />
>>>>>>> Stashed changes
      </TabPanel>
      <TabPanel value={value} index={4}>
        Script
      </TabPanel>
    </Box>
  );
}
