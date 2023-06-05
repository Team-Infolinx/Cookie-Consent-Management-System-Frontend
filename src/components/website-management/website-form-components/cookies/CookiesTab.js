import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import axios from "axios";

import CookieTable from "./CookieTable";
import CookieDialog from "./CookieDialog";

export default function CookiesTab(props) {
  const [cookies, setCookies] = useState([]);
  const [cookieCategories, setCookieCategories] = useState([]);

  useEffect(() => {
    if (props.websiteId) {
      getAllCookies();
      getAllCookieCategories();
    }
  }, [props.websiteId]);

  // Get all existing cookies.
  async function getAllCookies() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/websites/${websiteId}/cookies`
      );
      if (response.data) {
        setCookies(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  //  Get all existing cookie categories.
  async function getAllCookieCategories() {
    try {
      let websiteId = props.websiteId;
      const response = await axios.get(
        `http://localhost:8080/api/v1/websites/${websiteId}/cookie-categories`
      );
      if (response.data) {
        setCookieCategories(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
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

  // Add Cookie and Edit Cookie dialog box.
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState({
    cookieId: null,
    cookieName: "",
    domain: "",
    path: "",
    durationUnit: "",
    expireDuration: "",
  });

  function handleAddCookie() {
    setIsOpenDialog(true);
    setSelectedCookie({
      cookieId: null,
      cookieName: "",
      domain: "",
      path: "",
      durationUnit: "",
      expireDuration: "",
    });
  }

  function handleEditCookie(cookieToEdit) {
    setSelectedCookie(cookieToEdit);
    setIsOpenDialog(true);
  }

  function handleCancelClick() {
    setIsOpenDialog(false);
  }

  async function handleSaveClick(cookie) {
    let websiteId = props.websiteId;
    if (selectedCookie.cookieId) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/v1/websites/${websiteId}/cookies/${selectedCookie.cookieId}`,
          cookie
        );
        if (response.data) {
          updateCookie(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log(cookie);
        const response = await axios.post(
          `http://localhost:8080/api/v1/websites/${websiteId}/cookies`,
          cookie
        );
        if (response.data) {
          addNewCookie(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  // Related to cookie categorizing.
  function updateCookies(updatedCookie) {
    const updatedCookies = cookies.map((cookie) =>
      cookie.cookieId === updatedCookie.cookieId ? updatedCookie : cookie
    );
    setCookies(updatedCookies);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button variant="outlined" sx={{ mr: 1 }} onClick={handleAddCookie}>
          Add Cookie
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#00A5FF" }}
          startIcon={<DocumentScannerIcon />}
        >
          Scan Cookies
        </Button>
      </Box>

      <CookieDialog
        isOpen={isOpenDialog}
        handleClose={handleCancelClick}
        cookie={selectedCookie}
        handleSaveClick={handleSaveClick}
      />
      <CookieTable
        cookies={cookies}
        cookieCategories={cookieCategories}
        updateCookies={updateCookies}
        websiteId={props.websiteId}
        removeCookie={removeCookie}
        handleEditCookie={handleEditCookie}
      />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<ArrowBackIosNewOutlinedIcon />}
          onClick={props.handleBackTab}
        >
          Back
        </Button>
        <Button
          endIcon={<NavigateNextOutlinedIcon />}
          variant="contained"
          sx={{ bgcolor: "#00A5FF" }}
          onClick={props.handleNextTab}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
