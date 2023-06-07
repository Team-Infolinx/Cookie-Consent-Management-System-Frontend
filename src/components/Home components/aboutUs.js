import { Grid, Typography } from "@mui/material";
import aboutUsImg from "../../assets/svg/about us.svg";

const AboutUs = () => {
  return (
    <div
      className="aboutUs"
      style={{
        backgroundColor: "#024481",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Grid container flexDirection={"row"} justifyContent="space-evenly">
        <Grid item lg={12} md={12} sm={12} xs={12} alignItems="left">
          <Typography
            style={{ color: "#ffffff" }}
            variant="h2"
            pt={10}
            pl={5}
            pb={5}
          >
            About Us
          </Typography>
        </Grid>

        <Grid container direction={"row"}>
          <Grid
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ height: "50px" }}
          />
          <Grid
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            <img
              src={aboutUsImg}
              style={{
                height: 600,
                marginRight: "1em",
              }}
            />
          </Grid>

          <Grid
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{ paddingRight: 10, paddingLeft: 10, paddingBottom: 20 }}
          >
            <Typography
              sx={{ pt: 5 }}
              variant={"h6"}
              style={{ color: "#ffffff" }}
            >
              <p>
                <span style={{ fontSize: "2em" }}>W</span>eb-Safe Cookie Consent
                Management System is a trusted provider of cookie consent
                solutions. We specialize in helping website owners comply with
                privacy regulations and create a safer browsing experience for
                their visitors.
              </p>
              <p>
                With our user-friendly platform, you can easily generate
                customizable cookie banners, manage user preferences, and ensure
                legal compliance. Our goal is to simplify the cookie consent
                process and empower website owners to protect user privacy
                without sacrificing functionality.
              </p>
              <p>
                Our team of dedicated professionals is passionate about privacy
                and data protection. We stay up-to-date with the latest
                regulations to ensure our solutions meet the highest standards.
                We are committed to delivering exceptional customer support and
                helping you navigate the complexities of cookie consent
                management.
              </p>
              <p>
                Whether you have a small blog or a large e-commerce website,
                Web-Safe Cookie Consent Management System has the tools and
                expertise to meet your needs. Join thousands of satisfied
                customers who have chosen us for their cookie consent
                requirements.
              </p>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
