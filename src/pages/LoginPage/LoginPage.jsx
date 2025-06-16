import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { Box, Typography, Paper, Alert } from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleLogin = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.userName === username && u.password === password
    );

    if (foundUser) {
      dispatch(login(foundUser));
      navigate("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Вхід
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Неправильне імʼя користувача або пароль
          </Alert>
        )}

        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
