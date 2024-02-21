"use client";
import { Backdrop, Box, CircularProgress, useTheme } from "@mui/material";
import { IndividualCard } from "../IndividualCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addFavoriteCharacters,
  fetchCharacters,
} from "@/redux/features/character/character-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchComics } from "@/redux/features/comic/comic-slice";

export const CardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const status = useAppSelector((state) => state.charactersReducer.status);

  const filteredCharacters = useAppSelector(
    (state) => state.charactersReducer.filteredCharacters
  );

  const showFavorites = useAppSelector(
    (state) => state.charactersReducer.showFavorites
  );

  const favoriteCharacters = useAppSelector(
    (state) => state.charactersReducer.favoriteCharacters
  );

  const favoriteComics = useAppSelector(
    (state) => state.comicsReducer.favoriteComics
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCharacters());
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchComics());
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddFavorite = (id: number) => {
    dispatch(addFavoriteCharacters(id));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        padding: 2,
        flexDirection: "row",
        overflowY: "auto",
        flexWrap: "wrap",
        gap: "2rem",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={status === "loading" ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {showFavorites === true
        ? favoriteCharacters.map(({ name, thumbnail, id }, key) => (
            <IndividualCard
              key={key}
              name={name}
              thumbnail={thumbnail.path}
              id={id}
              extension={thumbnail.extension}
              favoriteCharacters={favoriteCharacters}
              favoriteComics={favoriteComics}
              handleAddFavorite={handleAddFavorite}
            />
          ))
        : filteredCharacters.map(({ name, thumbnail, id }, key) => (
            <IndividualCard
              key={key}
              name={name}
              thumbnail={thumbnail.path}
              id={id}
              extension={thumbnail.extension}
              favoriteCharacters={favoriteCharacters}
              favoriteComics={favoriteComics}
              handleAddFavorite={handleAddFavorite}
            />
          ))}
    </Box>
  );
};
