"use client";
import { Box } from "@mui/material";
import { IndividualCard } from "../IndividualCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addFavoriteCharacters,
  fetchCharacters,
} from "@/redux/features/character/character-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";

export const CardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const filteredCharacters = useAppSelector(
    (state) => state.charactersReducer.filteredCharacters
  );

  const showFavorites = useAppSelector(
    (state) => state.charactersReducer.showFavorites
  );

  const favoriteCharacters = useAppSelector(
    (state) => state.charactersReducer.favoriteCharacters
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
        justifyContent: "space-evenly",
      }}
    >
      {showFavorites === true
        ? favoriteCharacters.map(({ name, thumbnail, id }, key) => (
            <IndividualCard
              key={key}
              name={name}
              thumbnail={thumbnail.path}
              id={id}
              extension={thumbnail.extension}
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
              handleAddFavorite={handleAddFavorite}
            />
          ))}
    </Box>
  );
};
