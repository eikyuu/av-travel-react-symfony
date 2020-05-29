import React from "react";
import "./SearchBar.css";

const SearchBar = props => {
  return (
    <form className="container searchbar">
      <div className="row searchbar_row">
        <div className="col-sm-12 col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Destination"
          />
        </div>
        <div className="col-sm-12 col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3">
          <button type="submit" className="btn btn-warning btn_searchbar">
            search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
