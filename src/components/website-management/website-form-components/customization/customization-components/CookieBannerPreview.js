import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, {useEffect, useState} from "react";


const CookieBannerPreview = ()=>{


    return (
        <Grid>
            <Grid container item direction="column" justify="center" xs={9} lg={9} xl={9}>
                <div style={{width:'900px',
                            height:"600px",
                            backgroundColor:"white",
                            padding:15,
                            position:"relative",
                            border: " 5px solid #00a5ff",
                            borderRadius:10,

                        }}>
                            {/*Cookie Banner.*/}
                            <div style={{
                                width:'350px',
                                height:"250px",
                                backgroundColor:"orange",
                                alignSelf:"right",
                                position:"absolute",
                                padding:5,
                                top:10,
                                left:10,
                                bottom:0,
                                borderRadius:10
                            }}>
                                <div className={"banner-container"} style={{flexDirection:"row",
                                    paddingLeft:10,
                                    paddingTop:8,
                                    display:"flex",
                                    justifyContent:"space-between",

                                }}>
                                    <div style={{float:"left",}}><Typography sx={{color:"#ffffff",fontWeight:"bold"}}>Cookie Banner</Typography></div>
                                    <div style={{float:"right",}}><Button startIcon={<CancelIcon/>} sx={{color:"red"}}></Button></div>
                                </div>
                                <h5 style={{color:"#ffffff"}}>This Website Uses cookies</h5>
                                <h5 style={{color:"#ffffff"}}>banner content</h5>
                                <div className={"banner-button-container"} style={{flexDirection:"row",
                                    display:"flex",
                                    justifyContent:"space-between",
                                }}>
                                    <div style={{float:"right",paddingRight:10,}}><Button variant={"contained"}>Accept All</Button></div>
                                    <div style={{float:"right",paddingRight:8}}><Button variant={"contained"}>Customize</Button></div>
                                </div>
                            </div>
                        </div>
                        <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3}, }} fontWeight={"Bold"} align={"center"}>Banner Preview</Typography>
                </Grid>

        </Grid>

    );

}
export default CookieBannerPreview;

