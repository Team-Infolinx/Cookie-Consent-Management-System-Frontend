import {
  Alert,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppWidget from "../common components/AppWidget";
import AppBarChart from "../common components/AppBarChart";
import axios from "axios";
import AppPieChart from "../common components/AppPieChart";
import { useAuthContext } from "@asgardeo/auth-react";

export default function Dashboard() {
  const [noOfCookies, setNoOfCookies] = useState([0]);
  const [noOfConsent, setNoOfConsent] = useState([0]);
  const [noOfAcceptedConsent, setNoOfAcceptedConsent] = useState([0]);
  const [acceptanceRate, setAcceptanceRate] = useState([0]);
  const [websites, setWebsites] = useState([]);
  const [selectedWebsiteId, setselectedWebsiteId] = useState("");
  const [websitevisitdate, setWebsitevisitdate] = useState([]);
  const [noOfWebsiteVisits, setNoOfWebsiteVisits] = useState([]);

  const { getDecodedIDToken } = useAuthContext();
  const { state } = useAuthContext();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      getDecodedIDToken()
        .then((decodedIDToken) => {
          setUserId(decodedIDToken.sub);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [state]);

  const handleChange = (event) => {
    setselectedWebsiteId(event.target.value);
    loadNoOfCookies(event.target.value);
    loadNoOfConsent(event.target.value);
    loadNoOfAcceptedConsent(event.target.value);
    loadAcceptanceRate(event.target.value);
    loadWebsites(userId);
    loadWebsiteVisitDates(event.target.value);
    loadNoOfWebsiteVisits(event.target.value);
  };

  useEffect(() => {
    if (userId) {
      loadWebsites(userId);
    }
  }, [userId]);

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
      `http://localhost:8080/api/v1/users/${id}/websites`
    );
    setWebsites(result.data);
  };

  const loadWebsiteVisitDates = async (id) => {
    console.log("id", id);
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getWebsiteVisitsdates/" + id
    );
    setWebsitevisitdate(result.data);
    console.log("date list", websitevisitdate);
  };

  const loadNoOfWebsiteVisits = async (id) => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getWebsiteVisitsCount/" + id
    );
    console.log("visits ", result.data);
    setNoOfWebsiteVisits(result.data);
    console.log("state ", noOfWebsiteVisits);
  };

  return (
    <div>
      {websites.length === 0 ? (
        <Alert severity="info">
          There are no included websites at the moment. You can add new websites
          by clicking the 'Add Website' button.
        </Alert>
      ) : (
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
                        {website.domain}
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
              <AppWidget
                value={acceptanceRate + "%"}
                title={"Acceptance Rate"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ pt: 5 }}>
            <Grid item xs={12} md={12} lg={8}>
              <AppBarChart
                title="Website Visits"
                subheader="(+43%) than last year"
                chartLabels={websitevisitdate}
                chartData={[
                  {
                    name: "Website A",
                    type: "line",
                    fill: "solid",
                    data: noOfWebsiteVisits,
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
      )}
    </div>
  );
}
