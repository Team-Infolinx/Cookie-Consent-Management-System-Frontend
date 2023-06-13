import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import WebsitesTable from "../components/website-management/websites-page-component/WebsitesTable";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import WebsiteDeleteDialogBox from "../components/website-management/websites-page-component/WebsiteDeleteDialogBox";
import { useAuthContext } from "@asgardeo/auth-react";

function Websites() {
  const [websites, setWebsites] = useState([]);
  const [isOpenWebsiteDeleteDialog, setIsOpenWebsiteDialog] = useState(false);
  const [deletingWebsite, setDeletingWebsite] = useState();
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

  useEffect(() => {
    if (userId) {
      getAllWebsites();
    }
  }, [userId]);

  async function getAllWebsites() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${userId}/websites`
      );
      if (response.data) {
        setWebsites(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleOpenWebsiteDeleteDialog(websiteToDelete) {
    setDeletingWebsite(websiteToDelete);
    setIsOpenWebsiteDialog(true);
  }

  function handleCloseWebsiteDeleteDialog() {
    setDeletingWebsite(null);
    setIsOpenWebsiteDialog(false);
  }

  async function handleDeleteWebsiteClick() {
    try {
      let websiteId = deletingWebsite.websiteId;
      const response = await axios.delete(
        `http://localhost:8080/api/v1/users/${userId}/websites/${websiteId}`
      );
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
