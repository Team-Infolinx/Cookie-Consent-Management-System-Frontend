import { Grid, Typography} from "@mui/material";
import homePageBackground from "../../assets/svg/home-page-background.svg";
import landingImage from "../../assets/svg/landing-image.svg";
import HomeNavBar from "./homeNavBar";
const LandingPage = () => {

    return (

        <Grid  className="landingPage"
              style={{
                  minHeight: "100vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",

              }}
              sx={{backgroundImage:{xl:`url(${homePageBackground})`},bgcolor: {lg: "#036fc5",md: "#036fc5",sm: "#036fc5", xs: "#036fc5",}, minHeight: {sm: "30vh", xs: "30vh"}}}>
            <HomeNavBar />

            <Grid container direction={"row"} justify="center" alignItems={"center"} sx={{pl: { lg: 10,md: 10, sm: 10, xs: 10}}}>
                <Grid item lg={12} sx={{height:"200px"}} />
                <Grid item lg={5}>
                    <Typography style={{color: "#ffffff"}} variant="h3">Effortlessly manage cookie <br/>consent on your
                        website</Typography>
                    <Typography style={{color: "#ffffff"}} variant="h5">Our easy-to-use cookie consent management system
                        makes it simple to comply with <br/>privacy regulations and protect the data of your website
                        visitors</Typography>
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={5} justifyContent={"right"} sx={{pl: {lg: 10}, display: { xs: 'none', lg: 'block', xl: 'block' }}}  >
                    <img src={landingImage}
                         style={{
                             height:"600px"

                         }}/>
                </Grid>
            </Grid>
        </Grid>


    );

}

export default LandingPage;
