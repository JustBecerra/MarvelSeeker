"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: {
      default: "#F7F8FA",
      paper: "#3E3E3E",
    },
    primary: {
      main: "#FFFFFF",
      contrastText: "#A8A8A8",
      dark: "#505050",
    },
    common: {
      black: "#000000",
    },
  },
});
