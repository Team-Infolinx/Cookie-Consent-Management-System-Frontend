/*
import React, {useEffect, useState} from "react";
import {Button, Grid, Switch} from "@mui/material";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import {Stack} from "@mui/system";
import CustSelectBox from "./customization-components/CustSelectBox";
import CusPopUp from "./customization-components/CusPopUp";

function BannerCustomization() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#00a5ff",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [templates,settemplates] = useState([]);

    const loadTemplates = async () =>{
        const result = await axios.get("http://localhost:8080/api/template/getTemplates");
        console.log("this is"+result);
        settemplates(result.data);
    }
    useEffect(() => {
        loadTemplates();
    },[]);




    const [selectedTempContent,setSelectedTempContent] = useState([]);
    async function handleChangeTemplate(event) {
        const value = event.target.value;
        const tempFilter = templates.find((item) => {

            return item.templateName === value
        })
        setSelectedTempContent(tempFilter)
        console.log("templates.filter : ", tempFilter)
    }


    const[ top,setTop] =useState(10);


    function handleChangeTop(event){
        const value=event.target.value;
        if(value==="Top"){
            setTop(10);
        }
        if(value=="Bottom"){
            setTop(410);
        }
    }

    const[ left,setLeft] =useState(10);

    function handleChangeHorizontal(event){
        const value=event.target.value;
        if(value=="Left"){
            setLeft(10);
        }
        if(value=="Right"){
            setLeft(730);
        }
    }

    const[ color,setColor] =useState('#eb6c44');

    function handleChangeColor(event){
        const value= event.target.value;
        if(value=="Yellow"){
            setColor("#F1C40F");
        }
        if(value=="Dark Gray"){
            setColor("#34495E");

        }
        if(value=="Purple"){
            setColor("#9B59B6");
        }
    }

    const[openPopup,setOpenPopup] = useState(false);

    /!*Passing data to CusPopUp.js*!/
    const[selectedData,setSelectedData] = useState([]);


    const editButtonAction = (template) => {
        setSelectedData(template);
        setOpenPopup(true);
    }

    const handleClose = () => {
        setOpenPopup(false);
    }


    const bannerValues = [
        {id: 1, value: "Web safe - GDPR"},
        {id: 2, value: "Web safe - CCPA"}
    ];

    const bannerPosition = [
        {id: 1, value: "Top"},
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

    return (
    <Grid className="BannerCustomization">
        <Box
            sx={{
            width: 1500,
            height: 500,
            backgroundColor: '#fefefe',
                borderRadius:5,
                pt:{ lg:3,md: 3, sm:3, xs: 5},
                pb:{ lg:5,md: 5, sm:5, xs: 5},
                pl:{ lg:5,md: 5, sm:5, xs: 5},
                pr:{ lg:5,md: 5, sm:5, xs: 5},
                boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
                mb:8,

            }}>

            <Typography variant={"h5"} sx={{color:"#004587",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Bannner Templates</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Template Name</StyledTableCell>
                            <StyledTableCell align="center">Regulation Type</StyledTableCell>
                            <StyledTableCell align="center">Banner Content</StyledTableCell>
                            <StyledTableCell align="center">Default Template</StyledTableCell>
                            <StyledTableCell align="center">Edit Template</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {templates.map((template) => (
                            <StyledTableRow key={template.templateId}>
                                <StyledTableCell component="th" scope="row">
                                    {template.templateName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{template.templateRegulation}</StyledTableCell>
                                <StyledTableCell align="jusitfy">{template.templateContent}</StyledTableCell>
                                <StyledTableCell align="center"><Switch /></StyledTableCell>
                                <StyledTableCell align="center"><Button onClick={() => editButtonAction(template)} startIcon={<BorderColorIcon />}>Edit</Button></StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/!*Dialog box.*!/}
            <CusPopUp openPopup={openPopup}  data={selectedData} handleClose={handleClose} getTemps={loadTemplates}/>
        </Box>

        {/!*delete only grid tag*!/}
        <Grid>

        <Box sx={{
                width: 1500,
                height: "auto",
                backgroundColor: '#fefefe',
                borderRadius:5,
                pt:{ lg:3,md: 3, sm:3, xs: 5},
                pb:{ lg:5,md: 5, sm:5, xs: 5},
                pl:{ lg:5,md: 5, sm:5, xs: 5},
                pr:{ lg:5,md: 5, sm:5, xs: 5},
                boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)"

            }}>
            <Typography variant={"h5"} sx={{color:"#004587",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Customization</Typography>

            {/!*sx={{flexDirection: { lg:"row",sm: "column-reverse", xs: "column-reverse"}}}*!/}
            <Grid container  spacing={2}>
                <Grid container item direction="column" justify={"center"} xs={3}  lg={3} xl={3}>
                    <Typography variant={"h5"} sx={{color:"#004587",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Settings</Typography>

                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Banner Template</Typography>

                    <CustSelectBox name={"Banner Template"}  items={bannerValues} fun={handleChangeTemplate}/>

                    {/!*templates[0].templateName*!/}
                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3},pt:2}} fontWeight={"Bold"}>Banner Position</Typography>

                    <CustSelectBox name={"Banner Position"}  fun={handleChangeTop} items={bannerPosition} />

                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3},pt:2}} fontWeight={"Bold"}>Banner Alignment</Typography>

                    <CustSelectBox name="Banner Alignment"  fun={handleChangeHorizontal} items={bannerAlignment} />

                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3},pt:2}} fontWeight={"Bold"}>Banner Colour</Typography>

                    <CustSelectBox name="Banner Colour"  fun={handleChangeColor} items={bannerColor} />
                </Grid>

                <Grid container item direction="column" justify="center" xs={9} lg={9} xl={9}>

                    <div style={{width:'1100px',
                        height:"675px",
                        backgroundColor:"white",
                        padding:15,
                        position:"relative",
                        border: " 5px solid #00a5ff",
                        borderRadius:10,

                    }}>
                        {/!*Cookie Banner.*!/}
                        <div style={{
                            width:'350px',
                            height:"250px",
                            backgroundColor:color,
                            alignSelf:"right",
                            position:"absolute",
                            padding:5,
                            top:top,
                            left:left,
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
                            <h5 style={{color:"#ffffff"}}>{selectedTempContent.templateContent ? selectedTempContent.templateContent:""}</h5>
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
                <Grid container item direction="column" justify={"center"} xs={3}  lg={3} xl={3}>
                    <Stack spacing={2} direction="row" justifyContent={"space-around"} pt={10} pr={10}>
                        <Button variant={"contained"} style={{width:"100px"}}>Back</Button>
                        <Button variant={"contained"} style={{backgroundColor:"red",width:"100px"}}>Save</Button>
                        <Button variant={"contained"} style={{width:"100px"}}>Next</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        </Grid>
    </Grid>
    );
}

export default BannerCustomization;





*/
