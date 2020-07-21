import React from "react";
import { NavLink } from "react-router-dom";

const NavProfile = (props) => {
  return (
    <nav
      className="bg-light"
      style={{ width: "200px", height: "100vw", position: "relative" }}
    >
      <div>
        <ul className="navbar-nav">
          <li>
            <NavLink className="nav-link" to="/">
              Info profil
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/">
              Destinations favoris
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/">
              Reservations
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavProfile;
