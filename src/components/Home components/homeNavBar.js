import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/svg/web-safe-logo.svg";
import {Stack} from "@mui/system";
import {Grid, Typography} from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";


function HomeNavBar() {

    const [scroll, setScroll] = React.useState(0);
    const {  signIn } = useAuthContext();

    const handleScroll = () => {
        setScroll(window.scrollY);
    }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:
          scroll > 0
            ? {
                xl: "#ffffff",
                lg: "#ffffff",
                sm: "#ffffff",
                md: "#ffffff",
                xs: "#ffffff",
              }
            : {
                xl: "transparent",
                lg: "#ffffff",
                sm: "#ffffff",
                md: "#ffffff",
                xs: "#ffffff",
              },
        boxShadow: scroll > 0 ? "0px 2px 0px 0px rgba(0, 0, 0, 0.2)" : "none",
        height: "90px",
      }}
    >
      <Toolbar disableGutters>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            pl: { lg: 10, md: 10, sm: 10, xs: 10 },
            pt: 2,
          }}
          style={{ flexDirection: "row" }}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={2}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            alignContent="screenLeft"
          >
            <img
              src={logo}
              style={{
                height: 75,
                marginRight: "1em",
                paddingTop: 8,
              }}
            />
          </Grid>
          <Grid
            className={"123"}
            item
            xs={2}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ alignItems: "center", justifyContent: "center" }}
            sx={{ top: "50%", left: "50%" }}
          >
            <Stack
              spacing={2}
              direction="row"
              justifyContent={"flex-end"}
              sx={{ padding: 5 }}
            >
              <Button variant="contained">
                <Typography style={{ fontWeight: "bold" }} onClick={() => signIn()}>Sign in</Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
export default HomeNavBar;
