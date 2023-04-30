import { Box, Button, Typography } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import React, { useEffect, useState } from "react";
import CookieTable from "./CookieTable";
import axios from "axios";
import AddCookieDialog from "./AddCookieDialog";

export default function CookieScanner(props) {
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    if (props.websiteId) {
      getAllCookies();
    }
  }, [props.websiteId]);

  // Get all existing cookies.
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

  // Add new cookie.
  const [isOpenAddCookieDialog, setIsOpenAddCookieDialog] = useState(false);

  function handleOpenAddCookieDialog() {
    setIsOpenAddCookieDialog(true);
  }
  function handleCloseAddCookieDialog() {
    setIsOpenAddCookieDialog(false);
  }
  function addNewCookie(newCookie) {
    setCookies([...cookies, newCookie]);
  }

  function removeCookie(deletingCookieId) {
    const newCookies = cookies.filter(
      (cookie) => cookie.cookieId !== deletingCookieId
    );
    setCookies(newCookies);
  }

  function updateCookie(updatedCookie) {
    const newCookies = cookies.map((cookie) =>
      cookie.cookieId === updatedCookie.cookieId ? updatedCookie : cookie
    );
    setCookies(newCookies);
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Scan Website for Cookies.
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        Please click on the "Scan Cookies" button below to automatically scan
        for cookies on your website.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#00A5FF", mb: 2 }}
        startIcon={<DocumentScannerIcon />}
      >
        Scan Cookies
      </Button>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        To manually add a new cookie to your consent management settings, please
        click on the "Add Cookie" button below.
      </Typography>
      <AddCookieDialog
        isOpenAddCookieDialog={isOpenAddCookieDialog}
        handleOpenAddCookieDialog={handleOpenAddCookieDialog}
        handleCloseAddCookieDialog={handleCloseAddCookieDialog}
        addNewCookie={addNewCookie}
        websiteId={props.websiteId}
      />
      <CookieTable
        cookies={cookies}
        websiteId={props.websiteId}
        removeCookie={removeCookie}
      />
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
