"use client";
import { Box } from "@mui/material";
import { IndividualCard } from "../IndividualCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCharacters } from "@/redux/features/character/character-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";

export const CardContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useAppSelector((state) => state.characters.characters);
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);
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
      {characters.map(({ name, thumbnail }, key) => (
        <IndividualCard
          key={key}
          name={name}
          thumbnail={thumbnail.path}
          extension={thumbnail.extension}
        />
      ))}
    </Box>
  );
};
