"use client";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
export const IndividualCard = ({
  name,
  thumbnail,
  extension,
}: {
  name: string;
  thumbnail: string;
  extension: string;
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "20%",
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
          image={`${thumbnail}.${extension}`}
          alt="Card Image"
          style={{ objectFit: "cover" }}
        />
        <Typography>{name}</Typography>
      </CardActionArea>
    </Card>
  );
};
