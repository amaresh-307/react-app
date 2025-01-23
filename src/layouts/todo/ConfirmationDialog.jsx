/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function ConfirmationDialog({ dialogTitle, dialogDescription, open, onConfirm, onCancel }) {
  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle id="confirm-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-description">{dialogDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default ConfirmationDialog;
