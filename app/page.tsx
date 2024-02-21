"use client";
import { CardContainer } from "@/components/CardContainer";
import { useAppSelector } from "@/redux/store";

import { Box, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.modeReducer.mode);
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
        backgroundColor:
          mode === "dark" ? theme.palette.background.default : "unset",
      }}
    >
      <CardContainer />
    </Box>
  );
}
