import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({ open, user, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Підтвердження видалення</DialogTitle>
      <DialogContent>
        <Typography>
          Ви дійсно хочете видалити користувача{" "}
          <strong>{user?.userName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Скасувати
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Видалити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
