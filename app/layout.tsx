import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MUIThemeProvider } from "@/public/theme/provider";
import { ReduxProvider } from "@/redux/provider";
import { TopBar } from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Seeker",
  description: "Marvel App to track heroes and their comics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <MUIThemeProvider>
          <body className={inter.className}>
            <TopBar />
            {children}
          </body>
        </MUIThemeProvider>
      </ReduxProvider>
    </html>
  );
}
