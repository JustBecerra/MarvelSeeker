"use client";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { IndividualCard } from "../IndividualCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addFavoriteCharacters,
  fetchCharacters,
} from "@/redux/features/character/character-slice";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
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
  console.log({ status });
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        padding: 2,
        flexDirection: { mobile: "column", laptop: "row" },
        overflowY: "auto",
        flexWrap: "wrap",
        gap: "2rem",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
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
      {filteredCharacters.length === 0 && status !== "loading" && (
        <Box
          sx={{
            mt: { mobile: "15%", laptop: "unset" },
            border: `1px solid ${theme.palette.primary.contrastText}`,
            borderRadius: "0.75rem",
            height: "8rem",
            width: { mobile: "17rem", tablet: "22rem" },

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.light,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            We don&apos;t seem to have that character!
          </Typography>
          <SentimentDissatisfiedIcon
            sx={{ fill: theme.palette.primary.dark }}
          />
        </Box>
      )}
      {favoriteCharacters.length === 0 && showFavorites === true && (
        <Box
          sx={{
            mt: { mobile: "15%", laptop: "unset" },
            border: `1px solid ${theme.palette.primary.contrastText}`,
            borderRadius: "0.75rem",
            height: "8rem",
            width: { mobile: "17rem", tablet: "22rem" },

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.primary.light,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            You have to flag a character as favorite first!
          </Typography>
          <TipsAndUpdatesIcon sx={{ fill: theme.palette.primary.dark }} />
        </Box>
      )}
    </Box>
  );
};
