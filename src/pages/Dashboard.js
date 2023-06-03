import { Card, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppWidget from "../common components/AppWidget";
import axios from "axios";

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
      "http://websafe-backend-production.up.railway.app/api/v1/user/getNoOfCookies/" +
        id
    );
    setNoOfCookies(result.data);
  };

  const loadNoOfConsent = async (id) => {
    const result = await axios.get(
      "http://websafe-backend-production.up.railway.app/api/v1/user/getNoOfConsent/" +
        id
    );
    setNoOfConsent(result.data);
  };

  const loadNoOfAcceptedConsent = async (id) => {
    const result = await axios.get(
      "http://websafe-backend-production.up.railway.app/api/v1/user/getNoOfAcceptedConsent/" +
        id
    );
    setNoOfAcceptedConsent(result.data);
  };

  const loadAcceptanceRate = async (id) => {
    const result = await axios.get(
      "http://websafe-backend-production.up.railway.app/api/v1/user/getAcceptanceRate/" +
        id
    );
    setAcceptanceRate(result.data);
  };

  const loadWebsites = async (id) => {
    const result = await axios.get(
      "http://websafe-backend-production.up.railway.app/api/v1/user/getWebsites"
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
              {/* <InputLabel id="website-label">Website</InputLabel> */}
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
    </div>
  );
}
