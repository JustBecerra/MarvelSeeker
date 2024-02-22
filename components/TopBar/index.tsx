"use client";
import { AppBar, Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  activateFavorites,
  filterCharacters,
} from "@/redux/features/character/character-slice";
import { switchMode } from "@/redux/features/mode/mode-slice";
import { useAppSelector } from "@/redux/store";
import { BarInteractionsDesktop } from "../BarInteractionsDesktop";
import { BarInteractionsMobile } from "../BarInteractionsMobile";
export const TopBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const showFavorites = useAppSelector(
    (state) => state.charactersReducer.showFavorites
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("laptop"));
  const mode = useAppSelector((state) => state.modeReducer);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    dispatch(filterCharacters(e.target.value));
  };

  const handleFavorites = () => {
    dispatch(activateFavorites(!showFavorites));
  };

  const handleToggleMode = () => {
    if (mode.mode === "light") {
      dispatch(switchMode("dark"));
    } else dispatch(switchMode("light"));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {matches ? (
              <BarInteractionsDesktop
                handleToggleMode={handleToggleMode}
                handleFavorites={handleFavorites}
                handleChange={handleChange}
                searchTerm={searchTerm}
                showFavorites={showFavorites}
              />
            ) : (
              <BarInteractionsMobile
                handleToggleMode={handleToggleMode}
                handleFavorites={handleFavorites}
                handleChange={handleChange}
                searchTerm={searchTerm}
                showFavorites={showFavorites}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
