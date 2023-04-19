import {Grid, Typography} from "@mui/material"
import features_1 from "../../assets/svg/features-1.svg"
import features_2 from "../../assets/svg/features-2.svg"
import features_3 from "../../assets/svg/features-3.svg"
import features_4 from "../../assets/svg/features-4.svg"
import CardHome from "./common-components/cardHome"



const homeCards = [
    {title: "Scan Cookies", content: "Deep scan your website for cookies using our extensive database."},
    {title: "Customizable Banner", content: "Customize the banner layout, colour, content, behaviour, branding and add CSS customization to match your website’s design."},
    {title: "Consent Log", content: "Record and store users’ cookie consent for proof of compliance, including changes to cookie consent."},
    {title: "Analytics", content: "Get insights into your website's cookie usage with our analytics tool."},

];
const Features = () => {
    return (
        <div className="features"
             style={{
                 backgroundColor: '#ffffff',
                 backgroundRepeat: "no-repeat",
                 minHeight: "90vh",
             }}>

            <Grid container direction="row" justifyContent={"flex-start"} alignItems="center" pt={10} pl={5} pb={5}>
                <Typography style={{color: "#024481"}} variant="h2">Features</Typography>
            </Grid>

            <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <Grid container direction={"column"} justify={"center"}  alignItems={"center"} lg={12} md={12} sm={12} xs={12} sx={{height:"50px"}} />
                <Grid sx={{pb: {md: 10, sm: 10, xs: 10}}} container item direction="column" justify={"center"}
                      alignItems={"center"} lg={3} md={6} sm={12}>
                    <CardHome V1={homeCards[0].title} V2={homeCards[0].content} img={features_1}/>
                </Grid>

                <Grid sx={{pb: {md: 10, sm: 10, xs: 10}}} container item direction="column" justify={"center"}
                      alignItems={"center"} lg={3} md={6} sm={12}>

                    <CardHome V1={homeCards[1].title} V2={homeCards[1].content} img={features_2}/>

                </Grid>

                <Grid sx={{pb: {md: 10, sm: 10, xs: 10}}} container item direction="column" justify={"center"}
                      alignItems={"center"} lg={3} md={6} sm={12}>

                    <CardHome V1={homeCards[2].title} V2={homeCards[2].content} img={features_3}/>

                </Grid>

                <Grid sx={{pb: {md: 10, sm: 10, xs: 10}}} container item direction="column" justify={"center"}
                      alignItems={"center"} lg={3} md={6} sm={12}>

                    <CardHome V1={homeCards[3].title} V2={homeCards[3].content} img={features_4}/>

                </Grid>
            </Grid>
        </div>);
}

export default Features;
