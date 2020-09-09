import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthApi from "../../services/authApi";
import AuthContext from "../../contexts/authContext";
import { toast } from "react-toastify";
import JwtDecode from "jwt-decode";

const Navbar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [id, setId] = useState(0);

  const handleLogout = () => {
    AuthApi.logout();
    setIsAuthenticated(false);
    toast.info("vous êtes maintenant déconnecté");
    history.push("/login");
  };

  const findApiUser = () => {
    if (isAuthenticated) {
      const token = window.localStorage.getItem("authToken");
      const { idUserToken } = JwtDecode(token);
      setId(idUserToken);
    }
  };

  useEffect(() => {
    findApiUser();
  }, []);

  return (
    <header>
      <nav className="stroke navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand text-dark" to="/">
          AV-TRAVEL
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active mr-3">
              <NavLink className="nav-link" to="/">
                ACCUEIL
              </NavLink>
            </li>
            <li className="nav-item active mr-5">
              <NavLink className="nav-link" to="/destinations">
                DESTINATIONS
              </NavLink>
            </li>
            <li className="nav-item active mr-5">
              <NavLink className="nav-link poutou" to="/tours">
                CROISIERES
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item active mr-5">
                  <NavLink className="nav-link" to={"/profile/" + id}>
                    Profil
                  </NavLink>
                </li>
              </>
            )}
            {(!isAuthenticated && (
              <>
                <li className="nav-item active mr-5">
                  <NavLink to="/register" className="nav-link">
                    INSCRIPTION
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success">
                    CONNEXION
                  </NavLink>
                </li>
              </>
            )) || (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger mr-3">
                  DECONNEXION
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
