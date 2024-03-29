"use client";
import { ThemeProvider } from "@mui/material";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { useAppSelector } from "@/redux/store";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.modeReducer.mode);
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 600,
        laptop: 1200,
        desktop: 1536,
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      background: {
        default: mode === "light" ? "#F7F8FA" : "#080706",
      },
      primary: {
        main: mode === "light" ? "#FFFFFF" : "#000000",
        contrastText: mode === "light" ? "#A8A8A8" : "#575757",
        dark: mode === "light" ? "#505050" : "#AFAFAF",
        light: mode === "light" ? "#3E3E3E" : "#C1C1C1",
      },
      common: {
        black: mode === "light" ? "#000000" : "#FFFFFF",
        white: "#FFFFFF",
      },
      mode: mode,
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
