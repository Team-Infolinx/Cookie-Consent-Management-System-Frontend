import React from "react";
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
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

function WebsitesTable(props) {
  const websites = props.websites;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, overflow: "hidden" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#00A5FF" }}>
              <TableCell align="left" sx={{ color: "white" }}>
                Website Name
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Domain Name
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
