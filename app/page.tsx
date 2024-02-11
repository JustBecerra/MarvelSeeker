import { CardContainer } from "@/components/CardContainer";
import { Box, Container } from "@mui/material";

export default function Home() {
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
      }}
    >
      <CardContainer />
    </Box>
  );
}
