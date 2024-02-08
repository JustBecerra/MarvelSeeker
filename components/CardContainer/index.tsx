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
  console.log({ characters });
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);
  return (
    <Box
      sx={{
        flex: 1,
        padding: 2,
      }}
    >
      <IndividualCard />
    </Box>
  );
};
