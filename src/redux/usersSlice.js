import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      saveToLocalStorage(state.users);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      saveToLocalStorage(state.users);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      saveToLocalStorage(state.users);
    },
    editUser: (state, action) => {
      const { id, userName, email, password } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        user.userName = userName;
        user.email = email;
        user.password = password;
        saveToLocalStorage(state.users);
      }
    },
    deleteAllUsers: (state) => {
      state.users = [];
      saveToLocalStorage([]);
    },
  },
});

export const { setUsers, addUser, deleteUser, editUser, deleteAllUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
