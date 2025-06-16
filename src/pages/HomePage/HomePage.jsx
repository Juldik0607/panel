import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../redux/usersSlice";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ConfirmDialog from "../../components/UserDialog/UserDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from "@mui/material";

const HomePage = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [userToDelete, setUserToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[sortBy].toString().toLowerCase();
    const bVal = b[sortBy].toString().toLowerCase();
    return sortDirection === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setShowCreateModal(true)}
        >
          ДОДАТИ КОРИСТУВАЧА
        </Button>
        {showCreateModal && (
          <CreateUserModal onClose={() => setShowCreateModal(false)} />
        )}

        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                {/* ID */}
                <TableCell
                  onClick={() => handleSort("id")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    ID
                    {sortBy === "id" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </strong>
                </TableCell>

                {/* Username */}
                <TableCell
                  onClick={() => handleSort("userName")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Username
                    {sortBy === "userName" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </strong>
                </TableCell>

                {/* Password */}
                <TableCell
                  onClick={() => handleSort("password")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Password
                    {sortBy === "password" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </strong>
                </TableCell>

                {/* Email */}
                <TableCell
                  onClick={() => handleSort("email")}
                  sx={{ cursor: "pointer" }}
                >
                  <strong
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Email
                    {sortBy === "email" &&
                      (sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Profile</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Destroy</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/user/${user.id}`)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => setUserToDelete(user)}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {userToDelete && (
          <ConfirmDialog
            open={Boolean(userToDelete)}
            user={userToDelete}
            onConfirm={() => {
              dispatch(deleteUser(userToDelete.id));
              setUserToDelete(null);
            }}
            onCancel={() => setUserToDelete(null)}
          />
        )}
      </Paper>
    </Container>
  );
};

export default HomePage;
