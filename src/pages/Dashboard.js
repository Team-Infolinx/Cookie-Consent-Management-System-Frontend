import { Card, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppWidget from "../common components/AppWidget";
import AppBarChart from "../common components/AppBarChart";
import axios from "axios";
import AppPieChart from "../common components/AppPieChart";

export default function Dashboard() {
  const [noOfCookies, setNoOfCookies] = useState([]);
  const [noOfConsent, setNoOfConsent] = useState([]);
  const [noOfAcceptedConsent, setNoOfAcceptedConsent] = useState([]);
  const [acceptanceRate, setAcceptanceRate] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [selectedWebsiteId, setselectedWebsiteId] = useState("");

  const handleChange = (event) => {
    setselectedWebsiteId(event.target.value);
    loadNoOfCookies(event.target.value);
    loadNoOfConsent(event.target.value);
    loadNoOfAcceptedConsent(event.target.value);
    loadAcceptanceRate(event.target.value);
    loadWebsites(event.target.value);
  };

  useEffect(() => {
    setselectedWebsiteId(1);
    loadNoOfCookies(1);
    loadNoOfConsent(1);
    loadNoOfAcceptedConsent(1);
    loadAcceptanceRate(1);
    loadWebsites(1);
  }, []);

  const loadNoOfCookies = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getNoOfCookies/" + id
    );
    setNoOfCookies(result.data);
  };

  const loadNoOfConsent = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getNoOfConsent/" + id
    );
    setNoOfConsent(result.data);
  };

  const loadNoOfAcceptedConsent = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getNoOfAcceptedConsent/" + id
    );
    setNoOfAcceptedConsent(result.data);
  };

  const loadAcceptanceRate = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getAcceptanceRate/" + id
    );
    setAcceptanceRate(result.data);
  };

  const loadWebsites = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getWebsites"
    );
    setWebsites(result.data);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              py: 0.5,
              boxShadow: 2,
              textAlign: "center",
              borderRadius: "10px",
              backgroundColor: "primary.danger",
              "&:hover": {
                backgroundColor: "primary.dark",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="website-label"
                id="website"
                value={selectedWebsiteId}
                autoWidth
                label="website"
                onChange={handleChange}
              >
                {websites.map((website) => (
                  <MenuItem value={website.websiteId}>
                    {website.configName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ pt: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidget value={noOfCookies} title={"Cookies"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidget value={noOfConsent} title={"Interacted Users"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidget value={noOfAcceptedConsent} title={"Accepted Users"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidget value={acceptanceRate + "%"} title={"Acceptance Rate"} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ pt: 5 }}>
        <Grid item xs={12} md={12} lg={8}>
          <AppBarChart
            title="Website Visits"
            subheader="(+43%) than last year"
            chartLabels={[
              "01/01/2003",
              "02/01/2003",
              "03/01/2003",
              "04/01/2003",
              "05/01/2003",
              "06/01/2003",
              "07/01/2003",
              "08/01/2003",
              "09/01/2003",
              "10/01/2003",
              "11/01/2003",
              "12/01/2003",
            ]}
            chartData={[
              {
                name: "Website A",
                type: "column",
                fill: "solid",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <AppPieChart
            title="Acceptance Rate on cookie types"
            chartData={[
              { label: "Functional", value: 4344 },
              { label: "Performance", value: 5435 },
              { label: "Target", value: 1443 },
              { label: "Other", value: 4443 },
            ]}
            chartColors={["#ff4842", "#fec107", "#1790ff", "#00ab55"]}
          />
        </Grid>
      </Grid>
    </div>
  );
}
