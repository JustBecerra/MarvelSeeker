"use client";
import { CardContainer } from "@/components/CardContainer";

import { Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CardContainer />
    </Box>
  );
}
