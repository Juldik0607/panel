// src/components/LoginForm/LoginForm.jsx
import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password }); // просто передаём данные наверх
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Ім’я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Увійти
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
