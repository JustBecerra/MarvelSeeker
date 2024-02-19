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

export function MUIThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.modeReducer.mode);
  const theme = createTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      background: {
        default: "#F7F8FA",
      },
      primary: {
        main: "#FFFFFF",
        contrastText: "#A8A8A8",
        dark: "#505050",
        light: "#3E3E3E",
      },
      common: {
        black: "#000000",
      },
      mode,
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
