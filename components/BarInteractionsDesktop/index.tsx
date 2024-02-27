import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Divider,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import marvelIcon from "../../public/marvel.svg";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ChangeEvent, SyntheticEvent } from "react";
import { ComicType } from "@/types/ComicTypes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
type props = {
  handleToggleMode: () => void;
  handleFavorites: () => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  searchTerm: string;
  showFavorites: boolean;
};

type autocompleteProps = {
  event: SyntheticEvent<Element, Event>;
  value: ComicType | null;
  reason: AutocompleteChangeReason;
};

export const BarInteractionsDesktop = ({
  handleToggleMode,
  handleFavorites,
  handleChange,
  searchTerm,
  showFavorites,
}: props) => {
  const theme = useTheme();
  const router = useRouter();
  const handleComicSearch = ({ value, reason }: autocompleteProps) => {
    if (reason === "selectOption") router.push(`/comic/${value?.id}`);
  };
  const filteredComics = useAppSelector(
    (state) => state.comicsReducer.filteredComics
  );
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
        <IconButton
          disableRipple
          disableFocusRipple
          disableTouchRipple
          onClick={() => router.push(`/`)}
        >
          <Image priority src={marvelIcon} alt={""} width={72} height={36} />
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
        <Autocomplete
          options={filteredComics}
          disablePortal
          getOptionLabel={(option) => option.title}
          onChange={(event, value, reason) =>
            handleComicSearch({ event, value, reason })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              onChange={(e) => handleChange(e)}
              value={searchTerm}
              variant="standard"
              sx={{
                "& .MuiInput-root::before": {
                  borderBottom: "none !important",
                },
                width: "16rem",
              }}
            />
          )}
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
