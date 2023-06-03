import { Card, Typography } from "@mui/material";
import React from "react";

export default function AppWidget({ value, title }) {
  return (
    <div>
      <Card
        sx={{
          py: 2,
          boxShadow: 3,
          textAlign: "center",
          borderRadius: "80px",
          backgroundColor: "primary.dark",
          //   "&:hover": {
          //     backgroundColor: "primary.main",
          //     opacity: [0.9, 0.8, 0.7],
          //   },
        }}
      >
        <Typography variant="h3" sx={{ color: "#000000" }}>
          {value}
        </Typography>
        <Typography
          variant="subtitle3"
          sx={{ opacity: 0.72, color: "#000000" }}
        >
          {title}
        </Typography>
      </Card>
    </div>
  );
}
