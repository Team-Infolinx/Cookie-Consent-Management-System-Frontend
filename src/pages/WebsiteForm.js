import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuthContext } from "@asgardeo/auth-react";

import BasicTabs from "../components/website-management/website-form-components/tab-panel/BasicTabs";

export default function WebsiteForm() {
  const { getDecodedIDToken } = useAuthContext();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getDecodedIDToken()
      .then((decodedIDToken) => {
        setUserId(decodedIDToken.sub);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ p: 5 }}>
      <Typography
        variant="h5"
        sx={{ color: "#004587", fontWeight: "900", mb: 2 }}
      >
        Configuration for Your Website...
      </Typography>
      <Typography variant="body1" sx={{ color: "#004587" }} fontSize={16}>
        Customize your website's cookie and banner settings effortlessly.
      </Typography>
      <Box sx={{ pt: 5 }}>
        <BasicTabs userId={userId} />
      </Box>
    </Box>
  );
}
