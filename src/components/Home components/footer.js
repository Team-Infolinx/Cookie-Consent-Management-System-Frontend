import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import logoWhite from "../../assets/svg/web-safe-logo - white.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TwitterIcon from "@mui/icons-material/Twitter";
import { HashLink } from "react-router-hash-link";
import {Box} from "@mui/system";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#00a5ff",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {/*Column 1 */}
        <Grid
          container
          direction="column"
          justify={"center"}
          alignItems={"center"}
          item
          lg={4}
          md={12}
          sm={12}
          xs={12}
        >
          <Box sx={{width: {xl:"20vw", lg:"20vw", md:"40vw", sm:"50vw", xs:"60vw"},borderRadius:5,padding:3}}>
          {/*<div className="white logo" style={{ paddingLeft: "15px" }}>*/}
            <img
              src={logoWhite}
              alt={"logo white"}
              // style={{
              //   height: 200,
              //   width: 400,
              //   marginRight: "1em",
              // }}
            ></img>
          {/*</div>*/}
          </Box>
          <Typography style={{ color: "#ffffff" }} variant="h5">
            About us
          </Typography>
          <Typography style={{ color: "#ffffff" }} variant="h6">
            We manage your consent
          </Typography>
          <ul
            className="social icons"
            style={{
              display: "flex",
              justifyContent: "space-between",
              listStyleType: "none",
              paddingRight: "40px",
            }}
          >
            <li style={{ width: "30%", textAlign: "center", color: "#ffffff" }}>
              <FacebookIcon />
            </li>
            <li style={{ width: "30%", textAlign: "center", color: "#ffffff" }}>
              <InstagramIcon />
            </li>
            <li style={{ width: "30%", textAlign: "center", color: "#ffffff" }}>
              <LinkedInIcon />
            </li>
            <li style={{ width: "30%", textAlign: "center", color: "#ffffff" }}>
              <TwitterIcon />
            </li>
          </ul>
        </Grid>

        {/*Column 2.*/}
        <Grid
          container
          direction="column"
          justify={"center"}
          alignItems={"center"}
          item
          lg={4}
          md={12}
          sm={12}
          xs={12}
        >
          <Typography variant={"h5"} style={{ color: "#ffffff" }}>
            Useful links
          </Typography>
          <HashLink
            smooth
            to={"/#homeSection_1"}
            style={{ textDecoration: "none" }}
          >
            <Button variant={"text"}>
              <Typography variant={"h6"} style={{ color: "#ffffff" }}>
                Home
              </Typography>
            </Button>
          </HashLink>
          <HashLink
            smooth
            to={"/#homeSection_2"}
            style={{ textDecoration: "none" }}
          >
            <Button variant={"text"}>
              <Typography variant={"h6"} style={{ color: "#ffffff" }}>
                Features
              </Typography>
            </Button>
          </HashLink>
          <HashLink
            smooth
            to={"/#homeSection_3"}
            style={{ textDecoration: "none" }}
          >
            <Button variant={"text"}>
              <Typography variant={"h6"} style={{ color: "#ffffff" }}>
                About Us
              </Typography>
            </Button>
          </HashLink>
        </Grid>

        {/*Column 3.*/}
        <Grid
          container
          direction="column"
          justify={"center"}
          alignItems={"center"}
          item
          lg={4}
          md={12}
          sm={12}
          xs={12}
        >
          <Typography variant={"h5"} style={{ color: "#ffffff" }}>
            Contact with us
          </Typography>
          <Typography variant={"h6"} style={{ color: "#ffffff" }}>
            <DraftsOutlinedIcon />
            WebSafe@gmail.com
          </Typography>
          <Typography variant={"h6"} style={{ color: "#ffffff" }}>
            <LocalPhoneIcon />
            +9400-000-0000
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        style={{ backgroundColor: "#024481", padding: "15px" }}
      >
        <Typography style={{ textAlign: "center", color: "#ffffff" }}>
          Copyright Web Safe © 2023. All rights reserved.
        </Typography>
      </Grid>
    </div>
  );
};

export default Footer;
