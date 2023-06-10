import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

function PrivacyRegulation(props) {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedPolicies, setSelectedPolicies] = React.useState([]);
  const [regulations, setRegulations] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/v1/website-management/all-privacy-regulations`
      )
      .then((response) => {
        setRegulations(response.data);
      });
  }, []);

  const websiteId = props.websiteId;

  const loadPolicies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/website/${websiteId}/privacy-regulations`
      );
      const { privacyRegulations } = response.data[0];
      const selectedPolicies = privacyRegulations.map(
        (regulation) => regulation.regulationName
      );
      setSelectedPolicies(selectedPolicies);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDescription = () => {
    switch (selectedOption) {
      case "GDPR":
        return "The GDPR is a data privacy regulation that provides a framework for the protection of personal data of individuals within the European Union and European Economic Area. It grants individuals rights over their personal data and places obligations on organizations to protect personal data, report data breaches, and obtain consent for processing personal data. The GDPR applies to all organizations that process the personal data of EU citizens and has significant penalties for non-compliance..";
      case "CCPA":
        return "The California Consumer Privacy Act (CCPA) is a privacy law that grants certain rights to California residents over their personal information and places obligations on businesses that collect personal information. California residents have the right to know what personal information is being collected about them, to request the deletion of their personal information, and to opt-out of the sale of their personal information. Businesses that collect personal information from California residents must provide certain disclosures and implement measures to protect the privacy and security of personal information. The CCPA applies to certain businesses that collect personal information from California residents and includes penalties for non-compliance.";
      case "LGPD":
        return "The Lei Geral de Proteção de Dados (LGPD) is a data privacy law in Brazil that grants certain rights to Brazilian citizens over their personal data and places obligations on organizations that collect and process personal data. Brazilian citizens have the right to know what personal data is being collected about them, to request the deletion of their personal data, and to withdraw their consent to the processing of their personal data. Organizations that collect and process personal data must provide certain disclosures and implement measures to protect the privacy and security of personal data. The LGPD applies to all organizations that collect and process personal data in Brazil, and includes penalties for non-compliance.";
      case "PIPEDA":
        return "The Personal Information Protection and Electronic Documents Act (PIPEDA) is a Canadian federal privacy law that regulates the collection, use, and disclosure of personal information by private sector organizations. PIPEDA provides individuals with certain rights over their personal information, including the right to access, correct, and file complaints related to their personal information. PIPEDA applies to all private sector organizations, including charities and non-profit organizations, that collect, use, or disclose personal information in commercial activities. Penalties for non-compliance with PIPEDA include fines and potential legal action.";
      case "PDPA":
        return "The Personal Data Protection Act (PDPA) is a data privacy law in Singapore that requires organizations to obtain consent from individuals before collecting, using, or disclosing their personal data. Individuals have the right to access and correct their personal data, and organizations are required to take appropriate measures to protect personal data and notify individuals in the event of a data breach. The PDPA applies to all organizations in Singapore, and includes penalties for non-compliance, as well as the requirement to appoint a Data Protection Officer (DPO) to oversee data protection matters and ensure compliance with the law.";
      default:
        return (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              Please select the privacy regulation/s that you wish to
              incorporate into your website
            </Alert>
          </Stack>
        );
    }
  };

  const handleAddPrivacyRegulation = async () => {
    const selectedRegulation = regulations.find(
      (regulation) => regulation.regulationName === selectedOption
    );

    if (!selectedRegulation) {
      setError(true);
      return;
    }

    const websiteId = props.websiteId; // replace with the actual website ID
    const regulationId = selectedRegulation.regulationId;
    const alreadyAdded = selectedPolicies.includes(selectedOption);

    if (!alreadyAdded) {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/website-management/${websiteId}/privacy-regulation-management/${regulationId}`
        );
        setSelectedPolicies([...selectedPolicies, selectedOption]);
        setError(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  const deletePrivacyRegulation = async (websiteId, regulationId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/website-management/${websiteId}/privacy-regulation-management/${regulationId}`
      );
      const updatedSelectedPolicies = selectedPolicies.filter(
        (policy) => policy.regulationId !== regulationId
      );
      setSelectedPolicies(updatedSelectedPolicies);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gridGap: "1rem",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30rem", backgroundColor: "white" }}>
          <FormControl fullWidth>
            <InputLabel id="privacy-select-label">Privacy Policy</InputLabel>
            <Select
              labelId="privacy-label"
              id="privacy-select"
              value={selectedOption}
              label="Privacy"
              sx={{ width: "30rem" }}
              onChange={handleChange}
            >
              {regulations.map((regulation) => (
                <MenuItem
                  key={regulation.regulationId}
                  value={regulation.regulationName}
                >
                  {regulation.regulationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          onClick={handleAddPrivacyRegulation}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#00A5FF",
            marginTop: 4,
            marginBottom: 4,
            marginRight: 55,
          }}
          size="large"
        >
          <FormControl></FormControl>
          Add
        </Button>
      </div>
      <div>
        <Paper elevation={2} sx={{ p: 2 }}>
          <h3> Description</h3>
          <p>{getDescription()}</p>
        </Paper>
        <p></p>

        <Paper elevation={2} sx={{ p: 3 }}>
          <h3>Added Privacy Regulations</h3>
          <Box>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {selectedPolicies.length > 0 ? (
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {selectedPolicies.map((regulationName, index) => (
                      // <Paper key={index} sx={{ p: 2, mb: 2 , width: "30%" }}>
                      <tr>
                        <td key={index}>{regulationName}</td>
                        <td>
                          <Button
                            className="btn btn-danger mx-2"
                            variant="contained"
                            sx={{ bgcolor: "#fa344f", margin: "0 100px" }}
                            // onClick={() => deletePrivacyRegulation(websiteId,policy.regulationId)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                      // </Paper>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Alert severity="info">
                  Your website does not appear to have added any privacy
                  regulations !
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>

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
      </div>
    </>
  );
}

export default PrivacyRegulation;
