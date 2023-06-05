import {Grid, Typography} from "@mui/material";
import aboutUsImg from "../../assets/svg/about us.svg"

const AboutUs = () => {
    return (<div className="aboutUs"
                 style={{
                     backgroundColor: '#024481',
                     backgroundRepeat: "no-repeat",
                     minHeight: "100vh",

                 }}>


        <Grid container flexDirection={"row"} justifyContent="space-evenly">

            <Grid item lg={12} md={12} sm={12} xs={12} alignItems="left">
                <Typography style={{color: "#ffffff"}} variant="h2" pt={10} pl={5} pb={5}>About Us</Typography>
            </Grid>

            <Grid container direction={"row"} >
                <Grid container direction={"column"} justify={"center"}  alignItems={"center"} lg={12} md={12} sm={12} xs={12} sx={{height:"50px"}} />
                <Grid container direction={"column"} justify={"center"}  alignItems={"center"} lg={6} md={12} sm={12} xs={12}>

                    <img src={aboutUsImg} style={{
                        height: 600,
                        marginRight: '1em',
                    }}/>
                </Grid>

                <Grid container direction={"column"} justify={"center"} alignItems={"center"} lg={6} md={12} sm={12} xs={12}>

                    <Typography sx={{pt:5,}} variant="h4" style={{color: "#ffffff"}}><span style={{fontSize: "2em", fontWeight: "bold"}}>W</span>elcome to our cookie consent management system<span style={{color: "#ffffff", fontSize:"2em"}}>!</span>
                        <br /><span style={{fontSize: "2em"}}>W</span>e are a team of web developers who are passionate about helping businesses and organizations comply
                        with cookie consent regulations and protect the data of their website visitors.</Typography>

                </Grid>


        </Grid>
        </Grid>


    </div>);
}

export default AboutUs;
