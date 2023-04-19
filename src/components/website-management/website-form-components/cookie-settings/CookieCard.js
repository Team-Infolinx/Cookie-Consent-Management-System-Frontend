import {
  Alert,
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import DeleteCookieDialogBox from "./DeleteCookieDialogBox";
import axios from "axios";

function CookieCard(props) {
  // Handling deletion of a cookie.
  const [cookieToDelete, setCookieToDelete] = useState(null);
  const [isOpenDeleteCookieDialog, setIsOpenDeleteCookieDialog] =
    useState(false);

  function handleOpenDeleteCookieDialog(deletingCookie) {
    setCookieToDelete(deletingCookie);
    setIsOpenDeleteCookieDialog(true);
  }
  function handleDeleteCookieCancel() {
    setCookieToDelete(null);
    setIsOpenDeleteCookieDialog(false);
  }

  function handleDeleteClickInDialog() {
    handleDeleteCookie();
    handleDeleteCookieCancel();
  }

  async function handleDeleteCookie() {
    let websiteId = props.websiteId;
    let cookieId = cookieToDelete.cookieId;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/${websiteId}/${cookieId}/deleteCookie`
      );
      console.log(response.data);
      if (response.data) {
        props.removeCookie(cookieId);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Cookie Categorising.

  async function handleCookieCategorising(event) {
    const selectedCategoryName = event.target.value;
    const cookieCategory = props.cookieCategories.find(
      (category) => category.categoryName === selectedCategoryName
    );
    try {
      console.log(cookieCategory);
      let cookieCategoryId = cookieCategory.categoryId;
      let cookieId = props.cookie.cookieId;
      console.log(
        "cookieId" + cookieId + " and categoryId : " + cookieCategoryId
      );
      const response = await axios.put(
        `http://localhost:8080/api/v1/${cookieId}/${cookieCategoryId}/updateCategoryInCookie`
      );

      if (response.data) {
        console.log("Inside If" + JSON.stringify(response.data));
        props.updateCookie(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box>
      <Card sx={{ mt: 2 }} key={props.cookie.cookieId}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cookie Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Path</TableCell>
                  <TableCell>Expire Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenDeleteCookieDialog(props.cookie)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {props.cookie.cookieName ? props.cookie.cookieName : "-"}
                  </TableCell>
                  <TableCell>
                    {props.cookie.domain ? props.cookie.domain : "-"}
                  </TableCell>
                  <TableCell>
                    {props.cookie.path ? props.cookie.path : "-"}
                  </TableCell>
                  <TableCell>
                    {props.cookie.expireDate ? props.cookie.expireDate : "-"}
                  </TableCell>
                  <TableCell>
                    {props.cookieCategories.length === 0 ? (
                      <Alert severity="error">
                        Add Category to enable selection!
                      </Alert>
                    ) : (
                      <TextField
                        select
                        label="Category"
                        helperText="Select a category"
                        fullWidth
                        size="small"
                        value={
                          props.cookie.cookieCategory
                            ? props.cookie.cookieCategory.categoryName
                            : ""
                        }
                        onChange={handleCookieCategorising}
                      >
                        {props.cookieCategories.map((category) => (
                          <MenuItem
                            key={category.categoryId}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <DeleteCookieDialogBox
        cookieToDelete={cookieToDelete}
        isOpenDeleteCookieDialog={isOpenDeleteCookieDialog}
        handleDeleteCookieCancel={handleDeleteCookieCancel}
        handleDeleteClickInDialog={handleDeleteClickInDialog}
      />
    </Box>
  );
}

export default CookieCard;
