import {
  Alert,
  Button,
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
import axios from "axios";
import React from "react";

export default function CookieCategorisingTable(props) {
  async function handleCookieCategorising(event, cookie) {
    const selectedCategoryName = event.target.value;
    const cookieCategory = props.cookieCategories.find(
      (category) => category.categoryName === selectedCategoryName
    );
    try {
      let cookieCategoryId = cookieCategory.categoryId;
      let cookieId = cookie.cookieId;
      const response = await axios.put(
        `http://localhost:8080/api/v1/${cookieId}/${cookieCategoryId}/updateCategoryInCookie`
      );

      if (response.data) {
        props.updateCookies(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650, overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#00A5FF" }}>
            <TableCell align="left" sx={{ color: "white" }}>
              Cookie Name
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Path
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Expire Date
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Expire Time
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Category
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cookies.map((cookie) => (
            <TableRow
              key={cookie.cookieId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{cookie.cookieName}</TableCell>
              <TableCell align="left">{cookie.path}</TableCell>
              <TableCell align="left">{cookie.expireDate}</TableCell>
              <TableCell align="left">{cookie.expireTime}</TableCell>
              <TableCell align="left">
                {props.cookieCategories.length === 0 ? (
                  <Alert severity="error">
                    Add Category to enable selection!
                  </Alert>
                ) : (
                  <TextField
                    select
                    label="Category"
                    // helperText="Select a category"
                    fullWidth
                    size="small"
                    value={
                      cookie.cookieCategory
                        ? cookie.cookieCategory.categoryName
                        : ""
                    }
                    onChange={(event) => {
                      handleCookieCategorising(event, cookie);
                    }}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
