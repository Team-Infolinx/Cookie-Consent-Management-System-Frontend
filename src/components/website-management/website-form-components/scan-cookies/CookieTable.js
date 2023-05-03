import { Alert, Box, Typography } from "@mui/material";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import DeleteCookieDialog from "./DeleteCookieDialog";
import axios from "axios";

export default function CookieTable(props) {
  const alert = (
    <Alert severity="info">
      No cookies found. Scan for cookies using the Scan button or add a cookie
      manually using the Add Cookie button.
    </Alert>
  );

  // Handle deleting cookie.
  // Related to delete cookie dialog box.
  const [isOpen, setIsOpen] = useState(false);
  const [cookieToDelete, setCookieToDelete] = useState(null);

  function handleClose() {
    setCookieToDelete(null);
    setIsOpen(false);
  }

  function handleOpen(cookieToDelete) {
    setCookieToDelete(cookieToDelete);
    setIsOpen(true);
  }

  function handleDeleteClick() {
    handleDeleteCookie();
    handleClose();
  }

  async function handleDeleteCookie() {
    let websiteId = props.websiteId;
    let cookieId = cookieToDelete.cookieId;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/${websiteId}/${cookieId}/deleteCookie`
      );
      if (response.data) {
        props.removeCookie(cookieId);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const table = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#00A5FF" }}>
            <TableCell align="left" sx={{ color: "white" }}>
              Cookie Name
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Domain
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
              Actions
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
              <TableCell align="left">{cookie.domain}</TableCell>
              <TableCell align="left">{cookie.path}</TableCell>
              <TableCell align="left">{cookie.expireDate}</TableCell>
              <TableCell align="left">expire time</TableCell>
              <TableCell align="left">
                <IconButton
                  size="small"
                  onClick={() => props.handleEditCookie(cookie)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleOpen(cookie)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 1 }}
      >
        Cookies in your website.
      </Typography>
      {props.cookies.length === 0 ? alert : table}
      <DeleteCookieDialog
        isOpen={isOpen}
        handleClose={handleClose}
        cookieToDelete={cookieToDelete}
        handleDelete={handleDeleteClick}
      />
    </Box>
  );
}
