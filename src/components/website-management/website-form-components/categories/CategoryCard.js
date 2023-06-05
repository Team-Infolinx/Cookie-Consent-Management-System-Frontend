import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function CategoryCard(props) {
  return (
    <Card sx={{ mb: 2, bgcolor: "#004587" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight={700}>
            {props.category.categoryName}
          </Typography>
          <Box>
            <IconButton
              onClick={() => props.handleEditCategory(props.category)}
            >
              <EditOutlinedIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              onClick={() => props.handleOpenDeleteDialog(props.category)}
            >
              <DeleteOutlineIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="whitesmoke">
          {props.category.categoryDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
