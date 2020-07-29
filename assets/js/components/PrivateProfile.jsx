import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import JwtDecode from "jwt-decode";
import PageProfile from "../pages/PageProfile";

const PrivateProfile = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  const token = window.localStorage.getItem("authToken");
  const { roles, idUserToken } = JwtDecode(token);

  const { id } = useParams();
  const slug = Number(id);
  const userId = idUserToken;
  const userRoles = roles;

  return isAuthenticated &&
    userRoles.includes("ROLE_USER") &&
    token.length > 0 &&
    userId === slug ? (
    <PageProfile />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateProfile;
