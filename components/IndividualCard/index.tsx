"use client";
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";
export const IndividualCard = ({
  name,
  thumbnail,
  id,
  extension,
  handleAddFavorite,
}: {
  name: string;
  id: number;
  thumbnail: string;
  extension: string;
  handleAddFavorite: (id: number) => void;
}) => {
  const favoriteCharacters = useAppSelector(
    (state) => state.charactersReducer.favoriteCharacters
  );

  const handleStar = () => {
    const isAlreadyFavorite = favoriteCharacters.some((char) => char.id === id);
    if (isAlreadyFavorite) return true;
    else return false;
  };

  const handleAddFavorites = () => {
    handleAddFavorite(id);
  };
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "20%",
        height: 380,
        position: "relative",
        opacity: 1,
      }}
    >
      <IconButton
        onClick={handleAddFavorites}
        disableRipple
        disableFocusRipple
        disableTouchRipple
        sx={{ p: 0 }}
      >
        {!handleStar() ? (
          <StarOutlineIcon
            sx={{
              display: "flex",
              justifySelf: "flex-end",
              width: "2.5rem",
              height: "2.5rem",
              position: "absolute",
              top: 8,
              end: 8,
              right: 8,
              zIndex: 999,
              fill: theme.palette.primary.main,
            }}
          />
        ) : (
          <StarIcon
            sx={{
              display: "flex",
              justifySelf: "flex-end",
              width: "2.5rem",
              height: "2.5rem",
              position: "absolute",
              top: 8,
              end: 8,
              right: 8,
              zIndex: 999,
              fill: theme.palette.primary.main,
            }}
          />
        )}
      </IconButton>
      <CardMedia
        component="img"
        height="100%"
        image={`${thumbnail}.${extension}`}
        alt="Card Image"
        style={{ objectFit: "cover", filter: "brightness(0.6)" }}
      />
      <Typography
        sx={{
          position: "absolute",
          bottom: 23,
          left: 23,
          color: theme.palette.primary.main,
          fontWeight: "bold",
        }}
      >
        {name}
      </Typography>
    </Card>
  );
};
