import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  Link,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import marvelIcon from "../../public/marvel.svg";
import SearchIcon from "@mui/icons-material/Search";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import HomeIcon from "@mui/icons-material/Home";
import { ChangeEvent, useState } from "react";
type props = {
  handleToggleMode: () => void;
  handleFavorites: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  searchTerm: string;
  showFavorites: boolean;
};

export const BarInteractionsMobile = ({
  handleToggleMode,
  handleFavorites,
  handleChange,
  searchTerm,
  showFavorites,
}: props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenDrawer(open);
    };
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        p: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", marginRight: "5%" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ fill: theme.palette.primary.dark }} />
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Image priority src={marvelIcon} alt={""} width={72} height={36} />

            <Link href={"/"}>
              <HomeIcon
                sx={{
                  display: "flex",
                  justifySelf: "flex-end",
                  width: "2.5rem",
                  height: "2.5rem",
                  fill: theme.palette.primary.dark,
                }}
              />
            </Link>
            <IconButton
              onClick={handleFavorites}
              disableRipple
              disableFocusRipple
              disableTouchRipple
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

            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={handleToggleMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon sx={{ fill: theme.palette.primary.dark }} />
              ) : (
                <Brightness4Icon sx={{ fill: theme.palette.primary.dark }} />
              )}
            </IconButton>
          </Box>
        </SwipeableDrawer>
      </Box>
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
  );
};
