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
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ComicModal } from "../ComicModal";
import { useState } from "react";
import { fetchComicById } from "@/redux/features/comic/comic-slice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    dispatch(fetchComicById(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const favoriteCharacters = useAppSelector(
    (state) => state.charactersReducer.favoriteCharacters
  );

  const comicsById = useAppSelector((state) => state.comicsReducer.comicsById);

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
      <ComicModal
        open={open}
        onClose={handleClose}
        name={name}
        comics={comicsById}
      />
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
        style={{
          objectFit: "cover",
          filter: "brightness(0.6)",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
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
