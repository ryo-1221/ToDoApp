import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BoolAlert(props) {
  const { buttonComponent, AlertTitle, AlertContent, yesText, yesFunction, noText, noFunction } = { ...props };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{buttonComponent}</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{AlertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{AlertContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={noFunction ? noFunction : handleClose} autoFocus>
            {noText}
          </Button>
          <Button onClick={yesFunction ? yesFunction : handleClose}>{yesText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
