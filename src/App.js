import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // 💡 добавлено
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import EditUser from "./pages/EditUser/EditUser";
import NotFoundPage from "./pages/NotFound/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import UserCard from "./components/UserCard/UserCard";
import initialUsers from "./data/users.json";
import DataChoiceDialog from "./components/DataChoiceDialog/DataChoiceDialog";
import { setUsers } from "./redux/usersSlice";

const App = () => {
  const [isDataInitialized, setIsDataInitialized] = useState(false);
  const [showChoiceDialog, setShowChoiceDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("users");

    if (!localData) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
      dispatch(setUsers(initialUsers));
      setIsDataInitialized(true);
    } else {
      setShowChoiceDialog(true);
    }
  }, [dispatch]);

  const handleChoice = (source) => {
    if (source === "file") {
      localStorage.setItem("users", JSON.stringify(initialUsers));
      dispatch(setUsers(initialUsers));
    } else {
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      dispatch(setUsers(localUsers));
    }
    setIsDataInitialized(true);
    setShowChoiceDialog(false);
  };

  if (!isDataInitialized && !showChoiceDialog) return null;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/user/:id" element={<UserCard />} />
          <Route path="/user/:id/edit" element={<EditUser />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      <DataChoiceDialog open={showChoiceDialog} onSelect={handleChoice} />
    </>
  );
};

export default App;
