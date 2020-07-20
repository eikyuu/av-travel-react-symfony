import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import JwtDecode from "jwt-decode";
import usersApi from "../services/usersApi";
import { toast } from "react-toastify";

const PrivateProfile = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  const token = window.localStorage.getItem("authToken");
  const { roles, idUserToken } = JwtDecode(token);

  const { id } = useParams();
  const slug = Number(id);
  const userId = idUserToken;
  const userRoles = roles;

  // console.log(userId, slug, userRoles);

  const fetchUser = async (id) => {
    try {
      const { firstName, lastName } = await usersApi.find(id);
      setUser({
        firstName,
        lastName,
      });
    } catch (error) {
      toast.error("L'utilisateur n'a pas pu être chargé");
      props.history.replace("/");
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, []);

  return isAuthenticated &&
    userRoles.includes("ROLE_USER") &&
    token.length > 0 &&
    userId === slug ? (
    <>
      <h1 className="mt-5">{user.firstName}</h1>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateProfile;
