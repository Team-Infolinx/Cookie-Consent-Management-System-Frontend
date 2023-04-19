import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import WebsiteDeleteDialogBox from "./WebsiteDeleteDialogBox";
import axios from "axios";

function WebsitesTable(props) {
  // const [websites, setWebsites] = useState(props.websites);
  // useEffect(() => {
  //   setWebsites(props.websites);
  //   console.log(websites);
  // }, []);

  const websites = props.websites;

  //   Handle website deleting.

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#004587", fontWeight: "900", mb: 1, mt: 3 }}
      >
        Manage Website:
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#004587", mb: 3 }}
        fontSize={16}
      >
        To manage a website's cookie consent settings, simply click on the Edit
        Icon in the table. You will be taken to the website's details page where
        you can view and update the cookie categories, scan for cookies, and
        enable/disable the cookie consent banner.
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, overflow: "hidden" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#00A5FF" }}>
              <TableCell align="left" sx={{ color: "white" }}>
                Configuration Name
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Website
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {websites.map((website) => (
              <TableRow
                key={website.websiteId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{website.configName}</TableCell>
                <TableCell align="left">{website.domain}</TableCell>
                <TableCell align="center">
                  <Link
                    to="/user/websiteform"
                    state={{ websiteId: website.websiteId }}
                  >
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    size="small"
                    onClick={() => props.handleOpenWebsiteDeleteDialog(website)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default WebsitesTable;
