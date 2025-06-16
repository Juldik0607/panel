import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/usersSlice";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const CreateUserModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = users.some(
      (u) => u.userName.toLowerCase() === formData.userName.toLowerCase()
    );
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (userExists) {
      setErrorMessage("Користувач з таким ім’ям вже існує");
      setOpen(true);
      return;
    }

    if (emailExists) {
      setErrorMessage("Користувач з таким email вже існує");
      setOpen(true);
      return;
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...formData,
    };

    dispatch(addUser(newUser));
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h6" gutterBottom>
          Створити нового користувача
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="userName"
              label="Ім’я користувача"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Пароль"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                Додати
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Скасувати
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={handleCloseSnackbar}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateUserModal;
