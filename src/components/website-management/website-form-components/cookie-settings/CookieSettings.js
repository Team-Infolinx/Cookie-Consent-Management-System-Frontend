import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategoryDialogBox from "./AddCategoryDialogBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteCategoryDialogBox from "./DeleteCategoryDialogBox";
import CookieCard from "./CookieCard";
import AddCookieDialogBox from "./AddCookieDialogBox";
import ScanCookies from "./ScanCookies";

export default function CookieSettings(props) {
  const [cookieCategories, setCookieCategories] = useState([]);
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    if (props.websiteId) {
      getAllCookieCategories();
      getAllCookies();
    }
  }, [props.websiteId]);

  useEffect(() => {
    console.log(cookieCategories);
    console.log(cookies);
  }, [cookieCategories, cookies]);

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

  //   Related to add category dialog box.
  const [isOpenAddCategoryDialog, setIsOpenAddCategoryDialog] = useState(false);
  function handleOpenAddCategoryDialog() {
    setIsOpenAddCategoryDialog(true);
  }
  function handleCloseAddCategoryDialog() {
    setIsOpenAddCategoryDialog(false);
  }

  function addNewCookieCategory(newCategory) {
    setCookieCategories([...cookieCategories, newCategory]);
  }

  //   Related to delete category dialog box.
  const [isOpenDeleteCategoryDialog, setIsOpenDeleteCategoryDialog] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  function handleDeleteCategoryClick(category) {
    setCategoryToDelete(category);
    setIsOpenDeleteCategoryDialog(true);
  }

  function handleDeleteCategoryCancel() {
    setCategoryToDelete(null);
    setIsOpenDeleteCategoryDialog(false);
  }

  function removeCategory(deletingCategoryId) {
    const newCategories = cookieCategories.filter(
      (category) => category.categoryId !== deletingCategoryId
    );
    setCookieCategories(newCategories);
  }
  // END.

  //   Related to Add Cookie Dialog Box.
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
      <ScanCookies />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            sx={{ color: "#004587", fontWeight: "900", mb: 1 }}
          >
            Cookie Categories:
          </Typography>
          <Box>
            {cookieCategories.length === 0 ? (
              <Alert severity="info">
                No categories found. Please add categories using the 'Add
                Category' button.
              </Alert>
            ) : (
              <List
                sx={{
                  bgcolor: "background.paper",
                  color: "#004587",
                  pt: "0px",
                  pb: "0px",
                  mt: 2,
                  minWidth: "200px",
                  borderRadius: "5px",
                  boxShadow: 3,
                }}
              >
                {cookieCategories.map((category) => (
                  <ListItem key={category.categoryId} divider>
                    <ListItemText primary={category.categoryName} />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCategoryClick(category)}
                    >
                      <DeleteOutlineIcon
                        fontSize="small"
                        sx={{ color: "#004587" }}
                      />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
            <AddCategoryDialogBox
              isOpenAddCategoryDialog={isOpenAddCategoryDialog}
              handleOpenAddCategoryDialog={handleOpenAddCategoryDialog}
              handleCloseAddCategoryDialog={handleCloseAddCategoryDialog}
              addNewCookieCategory={addNewCookieCategory}
              cookieCategories={cookieCategories}
              websiteId={props.websiteId}
            />
            <DeleteCategoryDialogBox
              isOpenDeleteCategoryDialog={isOpenDeleteCategoryDialog}
              handleDeleteCategoryCancel={handleDeleteCategoryCancel}
              categoryToDelete={categoryToDelete}
              websiteId={props.websiteId}
              removeCategory={removeCategory}
            />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="h6"
            sx={{ color: "#004587", fontWeight: "900", mb: 1 }}
          >
            Cookies:
          </Typography>
          <Box sx={{ mt: 2 }}>
            {cookies.length === 0 ? (
              <Alert severity="info">
                No cookies found. Scan for cookies using the Scan button or add
                a cookie manually using the Add Cookie button.
              </Alert>
            ) : (
              cookies.map((cookie) => (
                <CookieCard
                  key={cookie.cookieId}
                  cookie={cookie}
                  cookieCategories={cookieCategories}
                  removeCookie={removeCookie}
                  websiteId={props.websiteId}
                  updateCookie={updateCookie}
                />
              ))
            )}
            <AddCookieDialogBox
              isOpenAddCookieDialog={isOpenAddCookieDialog}
              handleOpenAddCookieDialog={handleOpenAddCookieDialog}
              handleCloseAddCookieDialog={handleCloseAddCookieDialog}
              addNewCookie={addNewCookie}
              websiteId={props.websiteId}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
