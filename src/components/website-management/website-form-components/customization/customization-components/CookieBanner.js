import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import CustSelectBox from "./CustSelectBox";
import {Box} from "@mui/system";
import {Button} from "@mui/material";
import {BannerContext} from "./BannerContext";
import CustSelectBoxBanner from "./CustSelectBoxBanner";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CookieSettingsDialog from "./CookieSettingDialog";


const CookieBannner = () =>{

    const { setColor,setTop,setLeft,setChosenCont,color} = useContext(BannerContext);

    const [templates,settemplates] = useState([]);

    const [banner,setBanner] = useState([]);

    const [selectedTemplate, setSelectedTemplate] = useState({});

    const [alignmentValue,setAlignmentValue] = useState('');

    const [positionValue,setPositionValue] =useState('');

    const [colorValue,setColorValue] =useState('');

    const passedId = useContext(BannerContext).websiteId;

    /*Sanck bar useStates*/
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [showDialog, setShowDialog] = useState(false);

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleCustomizeClick = () => {
        setShowDialog(prevShowDialog => !prevShowDialog);
    };

    console.log("passed id"+passedId);



    const loadTemplates = async () => {

        const websiteID = passedId;
        const result = await axios.get(`http://localhost:8080/api/template/getAllTemplates/${websiteID}`);
        settemplates(result.data);

        if(Object.keys(selectedTemplate).length !== 0){
            const template = result.data.find((t) => t.templateRegulation === selectedTemplate?.templateRegulation);
            setSelectedTemplate(template);
        } else {
            const template = result.data[0];
            console.log("Empty Value : ", template)
            setSelectedTemplate(template);
        }
    }


    const laodBanner = async () => {
        const websiteID = passedId;
        try {
            const response = await axios.get(`http://localhost:8080/api/banner/getBanners/${websiteID}`);
            const result = response.data;
            setBanner(result);

            const { bannerPosition, bannerColor, bannerAlignment } = result;
            setPositionValue(bannerPosition);
            handleChangeTop(bannerPosition);
            handleChangeHorizontal(bannerAlignment);
            handleChangeColor(bannerColor);
        }
        catch (error) {
            console.error("Error loading banners:", error);
        }
    };


    console.log("this is banner"+JSON.stringify(banner));
    console.log("this is alignment"+alignmentValue);

    console.log("this is color"+color);
    console.log("this default"+positionValue);



    useEffect(() => {
        loadTemplates();
        laodBanner();
    }, []);


    const regulationValues = templates?.length > 0 ? templates.map(template => ({ id: template.templateId, value: template.templateRegulation }))
        : [];

    const choosenTemplate = (e) => {
        const selectedRegulation = e.target.value;
        let chosenTemp=null;
        let chosenCont=null;

        for (let i = 0; i < templates.length; i++) {
            if (templates[i].templateRegulation === selectedRegulation) {
                chosenCont= templates[i].templateContent;
                break;
            }
        }

        const template = templates.find((t) => t.templateRegulation === e.target.value);
        setSelectedTemplate(template);
        setChosenCont(chosenCont);
    };

    function handleChangeTop(value){
        if(value==="Top" ){
            setTop(10);
            setPositionValue(value);
        }
        if(value==="Bottom" ){
            setTop(280);
            setPositionValue(value);
        }
    }

    function handleChangeHorizontal(value){
        if(value==="Left"){
            setLeft(10);
            setAlignmentValue(value);
        }
        if(value==="Center"){
            setLeft(240);
            setAlignmentValue(value);
        }
        if(value==="Right"){
            setLeft(475);
            setAlignmentValue(value);
        }
    }


    function handleChangeColor(value){
        if(value==="Yellow" || value==="#F1C40F"){
            setColor("#F1C40F");
            setColorValue("Yellow");
        }
        if(value==="Dark Gray" || value==="#3f454a"){
            setColor("#34495E");
            setColorValue("Dark Gray");
        }
        if(value==="Purple" || value==="#9B59B6"){
            setColor("#9B59B6");
            setColorValue("Purple");
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError(false);
        setErrorMessage('');
    };



    async function handlesave() {

        const websiteID = passedId;

        const bannerSave = {
            bannerPosition: positionValue,
            bannerColor: color,
            bannerAlignment: alignmentValue,
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/banner/updateBanner/${websiteID}`, bannerSave);
            console.log("success", response.data);
            setSnackbarMessage('Save Completed!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error saving banner:", error)
            setError(true);
            setErrorMessage('An error occurred while saving the banner.');
        }

        console.log("Top value is", alignmentValue);
        console.log("Left value is", positionValue);
        console.log("Color value is", color);
        console.log("Banner value:", JSON.stringify(bannerSave));
    }


    const bannerPosition = [
        {id: 1, value: "Top"},
        {id: 2, value: "Bottom"}
    ];

    const bannerAlignment = [
        {id: 1, value: "Left"},
        {id: 2, value: "Center"},
        {id: 3, value: "Right"}
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
                    <CustSelectBox name={"Default template"} items={regulationValues} width={300} fun={choosenTemplate} selectedTemplate={selectedTemplate}/>
                </div>
                {/*templates[0].templateName*/}
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBoxBanner name={"Banner Position"}  fun={handleChangeTop} items={bannerPosition} width={300} defaultValue={positionValue}/>
                </div>
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBoxBanner name="Banner Alignment"  fun={handleChangeHorizontal} items={bannerAlignment} width={300} defaultValue={alignmentValue}/>
                </div>
                <div style={{paddingTop:10,paddingBottom:10,paddingLeft:15}}>
                    <CustSelectBoxBanner name="Banner Colour"  fun={handleChangeColor} items={bannerColor} width={300} defaultValue={colorValue}/>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20,paddingRight:60 }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant="contained" onClick={handleCustomizeClick}>Customize Settings</Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={handlesave}>Save Banner</Button>
                    </div>
                    <CookieSettingsDialog open={showDialog} onClose={handleCloseClick} />
                </div>

                <Snackbar
                    open={snackbarOpen || error} // Open the Snackbar for success and error messages
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity={error ? 'error' : 'success'}
                    >
                        {error ? errorMessage : snackbarMessage}
                    </MuiAlert>
                </Snackbar>

            </Box>
        </div>

    );

}

export default CookieBannner;