import { Box } from "@mui/material";
import { IndividualCard } from "../IndividualCard";

export const CardContainer = () => {
  return (
    <Box
      sx={{
        flex: 1, // Make the container flex to fill available space
        padding: 2,
      }}
    >
      <IndividualCard />
    </Box>
  );
};
