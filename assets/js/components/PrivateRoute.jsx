import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated && token && roles.includes("ROLE_ADMIN") ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
