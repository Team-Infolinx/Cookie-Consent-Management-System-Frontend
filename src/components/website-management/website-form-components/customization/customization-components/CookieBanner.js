import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import CustSelectBox from "./CustSelectBox";
import {Box, Stack} from "@mui/system";
import {Button} from "@mui/material";

const CookieBannner = () =>{

    const[ top,setTop] =useState(10);

    function handleChangeTop(event){
        const value=event.target.value;
        if(value==="Top"){
            setTop(10);
        }
        if(value==="Bottom"){
            setTop(410);
        }
    }

    const[ left,setLeft] =useState(10);

    function handleChangeHorizontal(event){
        const value=event.target.value;
        if(value==="Left"){
            setLeft(10);
        }
        if(value==="Right"){
            setLeft(730);
        }
    }

    const[ color,setColor] =useState('#eb6c44');

    function handleChangeColor(event){
        const value= event.target.value;
        if(value==="Yellow"){
            setColor("#F1C40F");
        }
        if(value==="Dark Gray"){
            setColor("#34495E");

        }
        if(value==="Purple"){
            setColor("#9B59B6");
        }
    }

    const bannerValues = [
        {id: 1, value: "Web safe - GDPR"},
        {id: 2, value: "Web safe - CCPA"}
    ];

    const bannerPosition = [
        {id: 1, value: "Top"},
        {id: 2, value: "Center"},
        {id: 2, value: "Bottom"}
    ];

    const bannerAlignment = [
        {id: 1, value: "Left"},
        {id: 2, value: "Right"}
    ];

    const bannerColor = [
        {id: 1, value: "Purple"},
        {id: 2, value: "Dark Gray"},
        {id: 3, value: "Yellow"}
    ];

    return(<div className={"Cookie-Banner"}>
            <Box sx={{backgroundColor:"#fefefe",width:"450px",height:"800px",align:"center",margin:3,paddingTop:5,paddingLeft:5, borderRadius:5,
                boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
                mb:8
            }}>
                <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3},}} fontWeight={"Bold"}>Cookie Banner</Typography>

                <div style={{paddingTop:30,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBox name={"Banner Template"}  items={bannerValues} width={300}/>
                </div>
                {/*templates[0].templateName*/}
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBox name={"Banner Position"}  fun={handleChangeTop} items={bannerPosition} width={300} />
                </div>
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBox name="Banner Alignment"  fun={handleChangeHorizontal} items={bannerAlignment} width={300}/>
                </div>
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBox name="Banner Colour"  fun={handleChangeColor} items={bannerColor} width={300}/>
                </div>

                <div style={{textAlign:"right",paddingRight:90,paddingTop:20}}>
                    <Button variant={"contained"}>Save Banner</Button>
                </div>
        </Box>
        </div>

    );

}

export default CookieBannner;