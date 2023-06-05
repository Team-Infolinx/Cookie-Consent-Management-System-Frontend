import React, {useContext, useEffect, useState} from "react";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import CustSelectBox from "./CustSelectBox";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import PopUp from "./PopUp";
import {BannerContext} from "./BannerContext";


const BannerTemplate = () =>{

    const[openPopup,setOpenPopup] = useState(false);

    const [selectedTemplate, setSelectedTemplate] = useState({});

    const [templates,settemplates] = useState([]);

    const passedId = useContext(BannerContext).websiteId;

    console.log("passed id temp"+passedId);


   const loadTemplates = async () => {

        const websiteID = passedId;
        const result = await axios.get(`http://localhost:8080/api/template/getAllTemplates/${websiteID}`);
        console.log("getAllTemplates :", result.data);
        settemplates(result.data);

        console.log("selectedTemplate length", Object.keys(selectedTemplate).length)
        console.log("selectedTemplate length", selectedTemplate)

        if(Object.keys(selectedTemplate).length !== 0){
            const template = result.data.find((t) => t.templateRegulation === selectedTemplate?.templateRegulation);
            setSelectedTemplate(template);
        } else {
            const template = result.data[0];
            console.log("Empty Value : ", template);
            setSelectedTemplate(template);
        }
    }
    useEffect(() => {
        loadTemplates();
      /*  console.log("this is temps"+templates);*/
    }, []);


    const editButtonAction = () => {
        setOpenPopup(true);
    }

    const handleClose = async () => {
        setOpenPopup(false);
        // console.log("handleClose : ",selectedTemplate?.templateRegulation)
        // const template = templates.find((t) => t.templateRegulation === selectedTemplate?.templateRegulation);
        // console.log("templates : ",template)
        // setSelectedTemplate(template);
    }


    const regulationValues = templates?.length > 0 ? templates.map(template => ({ id: template.templateId, value: template.templateRegulation }))
        : [];

   /* console.log("this is regu", JSON.stringify(regulationValues));
    console.log("this is zero", JSON.stringify(regulationValues[0].value));*/

    const choosenTemplate = (e) => {
        /*console.log("Chose Temp : ", e.target.value)*/
        const template = templates.find((t) => t.templateRegulation === e.target.value);
        setSelectedTemplate(template);

    }




    return(
        <div className={"TemplateView"}>
                <Box sx={{backgroundColor:"#fefefe",width:"450px",height:"800px",align:"center",margin:3,paddingTop:5,paddingLeft:5,
                    borderRadius:5,
                    boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)",
                    mb:8
                }}>
                    <Typography variant={"h6"} sx={{color:"#00A5FF",pb:{lg:3,md: 3, sm:3, xs: 3}}} fontWeight={"Bold"}>Banner Template</Typography>


                    <div style={{paddingTop:10,paddingBottom:10,textAlign:"right",paddingRight:45}}>
                        <CustSelectBox name={"Default template"} items={regulationValues} width={120} fun={choosenTemplate } selectedTemplate={selectedTemplate}/>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={String(selectedTemplate?.templateId) || ''} label="Template Name" variant="outlined" value={selectedTemplate?.templateName|| ''} InputLabelProps={{ shrink: true }}/>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={String(selectedTemplate?.templateId) || ''} label="Privacy Regulation Type" variant="outlined" value={selectedTemplate?.templateRegulation|| ''} InputLabelProps={{ shrink: true }}/>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={String(selectedTemplate?.templateId) || ''} label="Cookie policy link" variant="outlined" value={selectedTemplate?.templatePrivacyPolicyLink|| ''} InputLabelProps={{ shrink: true }}/>
                    </div>
                    <div style={{paddingTop:10,paddingBottom:10}}>
                        <TextField sx={{width:'40ch'}} id={String(selectedTemplate?.templateId) || ''} label="Content" variant="outlined" value={selectedTemplate?.templateContent|| ''} multiline={true} InputLabelProps={{ shrink: true }}/>
                    </div>
                    <div style={{textAlign:"right",paddingRight:55,paddingTop:20}}>
                        <Button variant={"contained"} onClick={editButtonAction}>Edit template</Button>
                        <PopUp openPopup={openPopup}  data={selectedTemplate} handleClose={handleClose} getTemps={loadTemplates}></PopUp>
                        {/*id={selectedTemplate?.templateId|| ''}*/}
                    </div>
                </Box>
        </div>

    );

}

export default BannerTemplate;