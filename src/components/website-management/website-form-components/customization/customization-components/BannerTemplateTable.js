import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import { BannerContext } from "./BannerContext";

const BannerTemplateTable = () => {
  const [templates, settemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const passedId = useContext(BannerContext).websiteId;

  const loadTemplates = async () => {
    const websiteID = passedId;
    const result = await axios.get(
      `http://localhost:8080/api/v1/templates/${websiteID}`
    );
    settemplates(result.data);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleSwitchChange = (selectedTemplate) => {
    const updatedTemplates = templates.map((template) => {
      if (template.templateId === selectedTemplate.templateId) {
        // Set the selected switch to true
        axios.put(
          `http://localhost:8080/api/v1/templates/default/${selectedTemplate.templateId}`,
          { templateDefault: "true" }

        );
        setSelectedTemplateId(selectedTemplate.templateId);

        return { ...template, templateDefault: true }; // Update the template with templateDefault: true
      } else {
        // Set other switches to false
        axios.put(
          `http://localhost:8080/api/v1/templates/default/${template.templateId}`,
          { templateDefault: "false" }
        );
        return { ...template, templateDefault: false }; // Update the template with templateDefault: false
      }
    });

    settemplates(updatedTemplates);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00a5ff",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className={"TemplateView"}>
      <Typography
        variant={"h5"}
        sx={{ color: "#004587", pb: { lg: 3, md: 3, sm: 3, xs: 3 } }}
        fontWeight={"Bold"}
      >
        Bannner Templates
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Template Name</StyledTableCell>
              <StyledTableCell align="center">Regulation Type</StyledTableCell>
              <StyledTableCell align="center">Default Template</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.length > 0 &&
              templates.map((template) => (
                <StyledTableRow key={template.templateId}>
                  <StyledTableCell component="th" scope="row">
                    {template.templateName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {template.templateRegulation}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Switch
                      checked={
                        template.templateId === selectedTemplateId ||
                        template.templateDefault === "true"
                      }
                      onChange={() => handleSwitchChange(template)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BannerTemplateTable;
