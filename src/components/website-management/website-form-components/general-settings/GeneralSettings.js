import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import axios from "axios";
import React, { useEffect, useState } from "react";

function GeneralSettings(props) {
  const [generalSettings, setGeneralSettings] = useState({
    websiteId: "",
    configName: "",
    domain: "",
  });
  const { websiteId, configName, domain } = generalSettings;
  const [configNameError, setConfigNameError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const [errorMessageForName, setErrorMessageForName] = useState("");
  const [errorMessageForDomain, setErrorMessageForDomain] = useState("");

  function onInputChange(event) {
    setGeneralSettings({
      ...generalSettings,
      [event.target.name]: event.target.value,
    });
  }

  // Get website general setting if exist.
  async function getWebsiteGeneralSettings() {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/users/${props.userId}/websites/${props.websiteId}`
      );
      if (response.data) {
        setGeneralSettings(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (props.websiteId) {
      getWebsiteGeneralSettings();
    }
  }, [props.websiteId]);
  // END

  // Handling Save Changes button click.
  function handleSaveChanges(event) {
    event.preventDefault();
    setConfigNameError(false);
    setDomainError(false);
    setErrorMessageForDomain("");
    setErrorMessageForName("");

    let isConfigNameValid = true;
    let isDomainValid = true;

    if (configName === "") {
      setConfigNameError(true);
      setErrorMessageForName("Configure Name can not be empty");
      isConfigNameValid = false;
    }
    if (domain !== "") {
      if (isValidDomain(domain) === false) {
        setDomainError(true);
        setErrorMessageForDomain("Enter a valid domain.");
      }
    } else {
      setDomainError(true);
      setErrorMessageForDomain("Domain can not be empty");

    }

    if (isConfigNameValid === true && isDomainValid === true) {
      saveWebsite();
    }
  }

  // Save Website in Database.
  async function saveWebsite() {
    try {
      let response;
      if (websiteId) {
        response = await axios.put(
          `http://localhost:8080/api/v1/users/${props.userId}/websites/${websiteId}`,
          generalSettings
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/v1/users/${props.userId}/websites`,
          generalSettings
        );
      }
      props.handleWebsiteId(response.data.websiteId);
      setGeneralSettings(response.data);
      props.handleNextTab();
    } catch (error) {
      console.log(error.message);
    }
  }

  function isValidDomain(domain) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/;
    return pattern.test(domain);
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSaveChanges}
    >
      <TextField
        required
        label="Website Name"
        placeholder="Enter your website name here..."
        size="normal"
        fullWidth
        sx={{ mt: 3 }}
        name="configName"
        value={configName}
        error={configNameError}
        helperText={errorMessageForName}
        onChange={(event) => onInputChange(event)}
      ></TextField>
      <TextField
        required
        label="Domain Name"
        placeholder="Enter your domain name here..."
        size="normal"
        fullWidth
        sx={{ mt: 3 }}
        name="domain"
        value={domain}
        error={domainError}
        helperText={errorMessageForDomain}
        onChange={(event) => onInputChange(event)}
      ></TextField>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4, bgcolor: "#00A5FF" }}
          endIcon={<NavigateNextOutlinedIcon />}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}

export default GeneralSettings;
