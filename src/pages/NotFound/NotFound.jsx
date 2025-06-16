import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleReturn = () => {
    if (isAuth) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <h2>404 – Сторінку не знайдено</h2>
      <button onClick={handleReturn}>Повернутися</button>
    </div>
  );
};

export default NotFoundPage;
