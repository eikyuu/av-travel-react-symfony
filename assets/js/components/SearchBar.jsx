import React from "react";

const SearchBar = ({ handleSearch, search }) => {
  return (
    <div className="form-group destination_search">
      <input
        type="text"
        onChange={handleSearch}
        value={search}
        className="form-control"
        placeholder="Rechercher ..."
      />
    </div>
  );
};

export default SearchBar;
