import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BannerTemplateTable from "./customization-components/BannerTemplateTable";
import CookieBannerPreview from "./customization-components/CookieBannerPreview";
import {BannerProvider} from "./customization-components/BannerContext";



function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs({value,setValue}) {

    const theme = useTheme();
    return (
        <Box sx={{ bgcolor: 'background.paper', width: "1000",height:"700" }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Banner Template" {...a11yProps(0)} />
                    <Tab label="Cookie Banner" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <BannerTemplateTable/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <CookieBannerPreview/>

                </TabPanel>
            </SwipeableViews>

        </Box>
    );
}

