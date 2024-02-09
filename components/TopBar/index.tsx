"use client";
import {
  AppBar,
  Box,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  useTheme,
} from "@mui/material";
import marvelIcon from "../../public/marvel.svg";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { filterCharacters } from "@/redux/features/character/character-slice";
export const TopBar = () => {
  const dispatch = useDispatch();
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    dispatch(filterCharacters(e.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={marvelIcon} alt={""} width={72} height={36} />
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  borderRightWidth: 2.5,
                  height: "2.5rem",
                }}
              />

              <Input
                placeholder="Buscar"
                onChange={(e) => handleChange(e)}
                value={searchTerm}
                sx={{
                  "&.MuiInput-root::before": {
                    borderBottom: "none !important",
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        fill: theme.palette.primary.dark,
                      }}
                    />
                  </InputAdornment>
                }
              />
            </Box>
            <Box sx={{ display: "flex", marginRight: "5%" }}>
              <IconButton
                onClick={() => setShowFavorites((prev) => !prev)}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                sx={{ marginRight: "1rem" }}
              >
                {!showFavorites ? (
                  <StarOutlineIcon
                    sx={{
                      display: "flex",
                      justifySelf: "flex-end",
                      width: "2.5rem",
                      height: "2.5rem",
                      fill: theme.palette.primary.dark,
                    }}
                  />
                ) : (
                  <StarIcon
                    sx={{
                      display: "flex",
                      justifySelf: "flex-end",
                      width: "2.5rem",
                      height: "2.5rem",
                      fill: theme.palette.primary.dark,
                    }}
                  />
                )}
              </IconButton>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{
                  borderRightWidth: 2.5,
                  height: "2.5rem",
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
