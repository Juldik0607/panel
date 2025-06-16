import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Typography, Paper, Box, Stack } from "@mui/material";

const UserCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) =>
    state.users.users.find((u) => u.id.toString() === id)
  );

  if (!user) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        Користувача не знайдено
      </Typography>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, minWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Картка користувача
        </Typography>
        <Typography>
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography>
          <strong>Ім’я користувача:</strong> {user.userName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Пароль:</strong> {user.password}
        </Typography>

        <Stack direction="row" spacing={2} mt={3}>
          <Link to={`/user/${user.id}/edit`}>
            <Button variant="outlined">Редагувати</Button>
          </Link>
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Назад до списку
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UserCard;
