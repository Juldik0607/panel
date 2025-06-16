import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  /*return isAuth ? children : <Navigate to="/404" replace />;*/
  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
