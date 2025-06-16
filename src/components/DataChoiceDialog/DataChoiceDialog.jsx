import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DataChoiceDialog = ({ open, onSelect }) => {
  return (
    <Dialog open={open} disableEscapeKeyDown>
      <DialogTitle>Вибір джерела даних</DialogTitle>
      <DialogContent>
        <Typography>
          У <strong>localStorage</strong> вже є збережені користувачі. Яке
          джерело даних використовувати?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onSelect("file")}
          color="secondary"
          variant="outlined"
        >
          Файл
        </Button>
        <Button
          onClick={() => onSelect("local")}
          color="primary"
          variant="contained"
        >
          LocalStorage
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataChoiceDialog;
