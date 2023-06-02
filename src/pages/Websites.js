import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import WebsitesTable from "../components/website-management/websites-page-component/WebsitesTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import WebsiteDeleteDialogBox from "../components/website-management/websites-page-component/WebsiteDeleteDialogBox";

function Websites() {
  const [websites, setWebsites] = useState([]);
  const [userId, setUserId] = useState(1000);

  useEffect(() => {
    getAllWebsites();
  }, [userId]);

  async function getAllWebsites() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/${userId}/getWebsites`
      );
      if (response.data) {
        setWebsites(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // Related to deleting websites.
  const [isOpenWebsiteDeleteDialog, setIsOpenWebsiteDialog] = useState(false);
  const [deletingWebsite, setDeletingWebsite] = useState();

  function handleOpenWebsiteDeleteDialog(websiteToDelete) {
    console.log(websiteToDelete);
    setDeletingWebsite(websiteToDelete);
    setIsOpenWebsiteDialog(true);
  }

  function handleCloseWebsiteDeleteDialog() {
    setDeletingWebsite(null);
    setIsOpenWebsiteDialog(false);
  }

  async function handleDeleteWebsiteClick() {
    try {
      console.log("deleting website :", deletingWebsite);
      console.log("userId :", userId);
      // let userId = props.userId;
      let websiteId = deletingWebsite.websiteId;
      const response = await axios.delete(
        `http://localhost:8080/api/v1/${userId}/${websiteId}/deleteWebsite`
      );
      console.log(response.data);
      if (response.data) {
        removeWebsite(websiteId);
        handleCloseWebsiteDeleteDialog();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function removeWebsite(websiteId) {
    const newWebsites = websites.filter(
      (website) => website.websiteId !== websiteId
    );
    setWebsites(newWebsites);
  }

  return (
    <Box sx={{ p: 5, pt: 2 }}>
      <Box sx={{ pl: 0 }}>
        <Typography variant="h3" sx={{ color: "#004587", fontWeight: "800" }}>
          Websites
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#004587", fontWeight: "900", mb: 2, mt: 1 }}
        >
          Manage all your websites' cookie consent settings in one place.
        </Typography>
        {/* <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
          Welcome to the Websites page of your Cookie Consent Management system.
          Here you can view, add, and manage all the websites that you have
          included in your cookie consent banner.
        </Typography> */}
      </Box>
      <Box sx={{ pl: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Typography
            variant="h6"
            sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 3 }}
          >
            Add Website
          </Typography> */}
          <Button
            variant="contained"
            href="/user/websiteform"
            sx={{ mt: 1, bgcolor: "#00A5FF", mb: 1 }}
          >
            ADD WEBSITE
          </Button>
        </Box>
        <Box sx={{ pl: 0, mt: 3 }}>
          {websites.length === 0 ? (
            <Alert severity="info">
              There are no included websites at the moment. You can add new
              websites by clicking the 'Add Website' button.
            </Alert>
          ) : (
            <WebsitesTable
              websites={websites}
              userId={userId}
              handleOpenWebsiteDeleteDialog={handleOpenWebsiteDeleteDialog}
            />
          )}
          <WebsiteDeleteDialogBox
            isOpen={isOpenWebsiteDeleteDialog}
            handleClose={handleCloseWebsiteDeleteDialog}
            deletingWebsite={deletingWebsite}
            handleDeleteWebsiteClick={handleDeleteWebsiteClick}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Websites;
