"use client";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
export const IndividualCard = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 256,
        height: 380,
      }}
    >
      <StarOutlineIcon
        sx={{
          display: "flex",
          justifySelf: "flex-end",
          width: "2.5rem",
          height: "2.5rem",
          fill: theme.palette.primary.dark,
        }}
      />
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image="https://example.com/your-image-url.jpg" // Replace with your image URL
          alt="Card Image"
          style={{ objectFit: "cover" }}
        />
        <Typography>Name</Typography>
      </CardActionArea>
    </Card>
  );
};
