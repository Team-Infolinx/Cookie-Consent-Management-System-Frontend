import React, { useState} from "react";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import CustSelectBox from "./CustSelectBox";
import {Button, TextField} from "@mui/material";
import CusPopUp from "./CusPopUp";

const BannerTemplate = () =>{

    const[openPopup,setOpenPopup] = useState(false);

    const editButtonAction = () => {
        setOpenPopup(true);
    }

    const handleClose = () => {
        setOpenPopup(false);
    }
    const templates=[{id:1,value:"GDPR"},
        {id:1,value:"CCPA"},
    ];



    return(
        <div className={"TemplateView"}>
                <Box sx={{backgroundColor:"#fefefe",width:"450px",height:"800px",align:"center",margin:3,paddingTop:5,paddingLeft:5,
                    borderRadius:5,
                    boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
                    mb:8
                }}>
                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Banner Template</Typography>
                    <div style={{paddingTop:10,paddingBottom:10,textAlign:"right",paddingRight:45}}>
                        <CustSelectBox name={"Default template"} items={templates} width={120}></CustSelectBox>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={"template_1"} label="Template Name" variant="outlined" value={"Web-Safe GDPR"} />
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={"template_2"} label="Privacy Regulation Type" variant="outlined" value={"GDPR"} />
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={"template_4"} label="Privacy policy link" variant="outlined" value={"Privacy policy link"} />
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={"template_3"} label="Content" variant="outlined" value="GDPR content" multiline={10} />
                    </div>
                    <div style={{textAlign:"right",paddingRight:55,paddingTop:20}}>
                        <Button variant={"contained"} onClick={editButtonAction}>Edit template</Button>

                      {/*  <CusPopUp openPopup={openPopup}  handleClose={handleClose}/>*/}
                    </div>
                </Box>
        </div>

    );

}

export default BannerTemplate;