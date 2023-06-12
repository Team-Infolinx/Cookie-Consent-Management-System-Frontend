import { Grid, Typography } from "@mui/material";
import homePageBackground from "../../assets/svg/home-page-background.svg";
import landingImage from "../../assets/svg/landing-image.svg";
import HomeNavBar from "./homeNavBar";
import Button from "@mui/material/Button";
import { useAuthContext } from "@asgardeo/auth-react";
import {Box} from "@mui/system";
const LandingPage = () => {

  return (
    <Grid
      className="landingPage"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      sx={{
        backgroundImage: {
          xl: `url(${homePageBackground})`,
          lg: `url(${homePageBackground})`,
        },
        bgcolor: { md: "#036fc5", sm: "#036fc5", xs: "#036fc5" },
        maxHeight: { sm: "30vh", xs: "30vh",md:"30vh" },
      }}
    >
      <HomeNavBar />

      <Grid
        container
        direction={"row"}
        justify="center"
        alignItems={"flex-start"}
        sx={{ pl: { lg: 10, md: 10, sm: 10, xs: 10 }, flexWrap: {md:"wrap",sm:"nowrap", xs:"nowrap"}, flexDirection:{lg:"row", md:"column"} }}
      >
        <Grid item lg={12} sx={{ height: {xl:"200px",lg:"200px", md:"200px", sm:"200px", xs:"200px"} }} />
        <Grid item sx={{ pt: { lg: 20, md: 10, sm: 10, xs: 11 },}} lg={5}>
          <Typography style={{ color: "#ffffff" }} variant="h3">
            Effortlessly manage cookie <br />
            consent on your website
          </Typography>
          <Typography style={{ color: "#ffffff",marginBottom:"20px"}} variant="h5">
            Our easy-to-use cookie consent management system makes it simple to
            comply with <br />
            privacy regulations and protect the data of your website visitors
          </Typography>
          <Button variant="contained"
                  sx={{backgroundColor:"#ffffff",
                      height:"40px",
                      width:"200px",
                      color:"#00a5ff",
                      borderRadius:3,
                      "&:hover": {
                        backgroundColor: "#97e7ff",
                      },

          }}>
            <Typography style={{ color: "#004587",fontWeight:"bold"}} variant="h5">Get Started</Typography>
          </Button>
        </Grid>
        <Grid item lg={2} />
        <Grid
          item
          lg={5}
          justifyContent={"right"}
          sx={{
            pl: { lg: 10 },
            display: { xs: "none", md: "none", lg: "block", xl: "block" },
          }}
        >
            <Box sx={{width: {xl:"30vw", lg:"35vw"},borderRadius:5,padding:3}}>
          <img
            src={landingImage}
            // style={{
            //   height: "600px",
            // }}
          />
            </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
