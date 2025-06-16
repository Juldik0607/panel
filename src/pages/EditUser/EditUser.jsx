import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editUser } from "../../redux/usersSlice";

import {
  TextField,
  Button,
  Typography,
  Stack,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);
  const user = users.find((u) => u.id.toString() === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleCloseSnackbar = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userNameTaken = users.some(
      (u) =>
        u.userName.toLowerCase() === form.userName.toLowerCase() &&
        u.id.toString() !== id
    );

    const emailTaken = users.some(
      (u) =>
        u.email.toLowerCase() === form.email.toLowerCase() &&
        u.id.toString() !== id
    );

    if (userNameTaken) {
      setErrorMessage("Ім’я користувача вже зайняте");
      setOpen(true);
      return;
    }

    if (emailTaken) {
      setErrorMessage("Email вже використовується");
      setOpen(true);
      return;
    }

    dispatch(editUser({ id: user.id, ...form }));
    navigate(`/user/${user.id}`);
  };

  if (!user)
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        Користувача не знайдено
      </Typography>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Редагування користувача: {user.userName}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Ім’я користувача"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ flex: 1 }}
              >
                ЗБЕРЕГТИ
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(`/user/${user.id}`)}
                sx={{ flex: 1 }}
              >
                СКАСУВАТИ
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
    </Container>
  );
};

export default EditUser;
