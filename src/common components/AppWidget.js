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
          borderRadius: "10px",
          backgroundColor: "#00A5FF",
        }}
      >
        <Typography variant="h3" sx={{ color: "white" }}>
          {value}
        </Typography>
        <Typography
          variant="subtitle3"
          sx={{ opacity: 0.72, color: "white", fontWeight: "900" }}
        >
          {title}
        </Typography>
      </Card>
    </div>
  );
}
