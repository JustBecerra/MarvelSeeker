import { ComicType } from "@/types/ComicTypes";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { theme } from "@/public/theme/theme";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addFavoriteComics } from "@/redux/features/comic/comic-slice";

export interface SimpleDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
  comics: ComicType[];
  favoriteComics: ComicType[];
}

export const ComicModal = (props: SimpleDialogProps) => {
  const { onClose, open, name, comics, favoriteComics } = props;
  const dispatch = useDispatch<AppDispatch>();
  const handleStar = (id: number) => {
    const isAlreadyFavorite = favoriteComics.some((char) => char.id === id);
    if (isAlreadyFavorite) return true;
    else return false;
  };

  const handleAddFavoriteComic = (id: number) => {
    dispatch(addFavoriteComics(id));
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: theme.palette.common.black }}>
        {name}
      </DialogTitle>
      <IconButton
        aria-label="close"
        disableRipple
        disableFocusRipple
        disableTouchRipple
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.common.black,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxHeight: "30rem",
          minWidth: "36rem",
          overflowY: "auto",
          marginBottom: "2rem",
        }}
      >
        {comics.map((comic, key) => (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
            key={key}
          >
            <Box sx={{ marginLeft: "1.5rem" }}>
              <Image
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt=""
                width={100}
                height={100}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "20px" }}>{name} </Typography>
                <IconButton
                  onClick={() => handleAddFavoriteComic(comic.id)}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  sx={{ p: 0 }}
                >
                  {!handleStar(comic.id) ? (
                    <StarOutlineIcon
                      sx={{
                        display: "flex",
                        justifySelf: "flex-end",
                        width: "1.5rem",
                        height: "1.5rem",
                        zIndex: 999,
                        fill: theme.palette.primary.dark,
                      }}
                    />
                  ) : (
                    <StarIcon
                      sx={{
                        display: "flex",
                        justifySelf: "flex-end",
                        width: "1.5rem",
                        height: "1.5rem",
                        zIndex: 999,
                        fill: theme.palette.primary.dark,
                      }}
                    />
                  )}
                </IconButton>
              </Box>
              <Typography
                sx={{
                  width: "80%",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                  fontSize: "13px",
                }}
              >
                {comic.description || "No Description Available"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
};
