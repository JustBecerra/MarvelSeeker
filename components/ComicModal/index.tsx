import { Dialog, DialogTitle } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
}

export const ComicModal = (props: SimpleDialogProps) => {
  const { onClose, open, name } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
    </Dialog>
  );
};
