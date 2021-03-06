import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import JwtDecode from "jwt-decode";

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const token = window.localStorage.getItem("authToken");
  const { roles } = JwtDecode(token);

  return isAuthenticated && token && roles.includes("ROLE_ADMIN") ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
