import {Button, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import FullWidthTabs from "./FullWidthTabs";
import BannerTemplate from "./customization-components/BannerTemplate";
import CookieBanner from "./customization-components/CookieBanner";
import {Box} from "@mui/system";



    const BannerCustomizationEdited = ()=>{


        const [component,setComponent]= useState(<BannerTemplate/>);
        const [value, setValue] = useState(0);


        const handleNextClick = () => {
            setComponent(<CookieBanner/>);
            setValue(1);
        };

        const handleBackClick = () => {
            setComponent(<BannerTemplate/>);
            setValue(0);
        };

    return (
        <Grid className={"customization"} container direction="row" justifyContent="space-evenly" alignItems="flex-start">
            <Grid className={"tab-tools"} container item direction="column" lg={4}>
                {component}
                <Box sx={{paddingTop:10,paddingBottom:10}}>
                    <Button variant={"contained"} style={{width:"100px"}} onClick={handleNextClick} >Next</Button>
                    <Button variant={"contained"} style={{backgroundColor:"red",width:"100px"}} onClick={handleBackClick}>Back</Button>
                </Box>
            </Grid>

            <Grid className={"customization-tabs"} container item direction="column" justify={"center"} lg={8} sx={{paddingTop:0}}>
                <Box sx={{backgroundColor:"#fefefe",width:"110vh",minHeight:"800px",align:"center",margin:3,paddingTop:5,paddingLeft:5,paddingRight:5, borderRadius:5,
                    boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
                    mb:8
                }}>
                <FullWidthTabs value={value} setValue={setValue}/>
                </Box>
            </Grid>
        </Grid>);

}
export default BannerCustomizationEdited;







