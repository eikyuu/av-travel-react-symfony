import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
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

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active mr-3">
            <NavLink className="nav-link" to="/">
              ACCUEIL<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item active mr-5">
            <NavLink className="nav-link" to="/destinations">
              DESTINATIONS<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item active mr-5">
            <NavLink className="nav-link" to="/tours">
              TOURS<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item active mr-5">
            <NavLink className="nav-link" to="/contact">
              CONTACT<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item active mr-5">
            <NavLink className="nav-link" to="/us">
              A PROPOS<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink to="/register" className="btn btn-secondary text-white">
              REGISTER
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="btn btn-dark text-white">
              LOGIN
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
