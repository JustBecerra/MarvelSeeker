import {
  Box,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import marvelIcon from "../../public/marvel.svg";
import SearchIcon from "@mui/icons-material/Search";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ChangeEvent } from "react";
type props = {
  handleToggleMode: () => void;
  handleFavorites: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  searchTerm: string;
  showFavorites: boolean;
};

export const BarInteractionsDesktop = ({
  handleToggleMode,
  handleFavorites,
  handleChange,
  searchTerm,
  showFavorites,
}: props) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          p: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={"/"}>
          <Image priority src={marvelIcon} alt={""} width={72} height={36} />
        </Link>
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
            searchTerm ? (
              <></>
            ) : (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    fill: theme.palette.primary.dark,
                  }}
                />
              </InputAdornment>
            )
          }
        />
      </Box>
      <Box sx={{ display: "flex", marginRight: "5%" }}>
        <IconButton
          onClick={handleFavorites}
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

        <IconButton
          disableRipple
          disableFocusRipple
          disableTouchRipple
          sx={{ ml: 1 }}
          onClick={handleToggleMode}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon sx={{ fill: theme.palette.primary.dark }} />
          ) : (
            <Brightness4Icon sx={{ fill: theme.palette.primary.dark }} />
          )}
        </IconButton>
      </Box>
    </>
  );
};
