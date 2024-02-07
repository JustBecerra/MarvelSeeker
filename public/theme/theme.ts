"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "light",
    background: {
      default: "#F7F8FA",
    },
    primary: {
      main: "#FFFFFF",
      dark: "#A8A8A8",
    },
  },
});

export default theme;
