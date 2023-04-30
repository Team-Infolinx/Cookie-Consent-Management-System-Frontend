import { Alert, Box, Button, Typography } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import React, { useEffect, useState } from "react";
import CookieCategorisingTable from "./CookieCategorisingTable";
import axios from "axios";

export default function CookieCategorising(props) {
  const [cookieCategories, setCookieCategories] = useState([]);
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    if (props.websiteId) {
      getAllCookieCategories();
      getAllCookies();
    }
  }, [props.websiteId]);

  // Functions to get cookies and categories from backend.
  async function getAllCookieCategories() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/${websiteId}/getCookieCategories`
      );
      if (response.data) {
        setCookieCategories(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function updateCookies(updatedCookie) {
    const updatedCookies = cookies.map((cookie) =>
      cookie.cookieId === updatedCookie.cookieId ? updatedCookie : cookie
    );
    setCookies(updatedCookies);
  }

  async function getAllCookies() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/${websiteId}/getCookies`
      );
      if (response.data) {
        setCookies(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const alertForCookies = (
    <Alert severity="error">
      Oops! It looks like we couldn't find any cookies saved under your website.
      Please scan for cookies or add them manually to ensure your website is
      privacy compliant.
    </Alert>
  );

  const alertForCategories = (
    <Alert severity="error" sx={{ mb: 2 }}>
      Oops! It looks like we couldn't find any cookie categories for your
      website. Please add some categories using the "Add Category" button to
      ensure your website is privacy compliant.
    </Alert>
  );

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Categorize Your Cookies for Privacy Compliance.
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        To comply with regulations and respect user privacy, it's important to
        assign a category to each cookie used on your website. Please select the
        relevant category for each cookie listed below to ensure your website's
        cookie settings are accurate and up-to-date.
      </Typography>
      <Box sx={{ mt: 3 }}>
        {cookieCategories.length === 0 ? alertForCategories : ""}
        {cookies.length === 0 ? (
          alertForCookies
        ) : (
          <CookieCategorisingTable
            cookies={cookies}
            cookieCategories={cookieCategories}
            updateCookies={updateCookies}
          />
        )}
      </Box>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<ArrowBackIosNewOutlinedIcon />}>Back</Button>
        <Button
          endIcon={<NavigateNextOutlinedIcon />}
          variant="contained"
          sx={{ bgcolor: "#00A5FF" }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
