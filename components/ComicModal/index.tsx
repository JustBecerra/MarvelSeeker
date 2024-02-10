import { ComicType } from "@/types/ComicTypes";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import Image from "next/image";

export interface SimpleDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
  comics: ComicType[];
}

export const ComicModal = (props: SimpleDialogProps) => {
  const { onClose, open, name, comics } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
      <Box>
        {comics.map((comic, key) => (
          <Box key={key}>
            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt=""
              width={50}
              height={50}
            />
            <Typography>{comic.title}</Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
};
