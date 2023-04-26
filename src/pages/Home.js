import React from "react";
import Features from "../components/Home components/features";
import AboutUs from "../components/Home components/aboutUs";
import CustomerFeedBack from "../components/Home components/feedBack";
import Footer from "../components/Home components/footer";
import LandingPage from "../components/Home components/landingPage";


function Home() {
  return (
    <div>
        <section id={'homeSection_1'}>
            <LandingPage></LandingPage>
        </section>
        <section id={'homeSection_2'}>
           <Features></Features>
        </section>
        <section id={'homeSection_3'}>
            <AboutUs />
        </section>
        <CustomerFeedBack />
        <Footer />

    </div>
  );
}

export default Home;

