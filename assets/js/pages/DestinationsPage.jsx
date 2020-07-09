import React, { useState } from "react";
import "./../components/destinations/Destinations.css";
import useDestinations from "../customHooks/useDestinations";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import DestinationCards from "../components/DestinationCards";

const DestinationsPage = (props) => {
  const destinations = useDestinations();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter management
  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.title.toLowerCase().includes(search.toLowerCase()) ||
      destination.pays.toLowerCase().includes(search.toLowerCase()) ||
      destination.description.toLowerCase().includes(search.toLowerCase()) ||
      destination.city.toLowerCase().includes(search.toLowerCase())
  );

  // Page change management
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 10;
  const paginatedDestinations = Pagination.getData(
    filteredDestinations,
    currentPage,
    itemsPerPage
  );

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-5 destinations_h1">Toutes les destinations</h1>
      <div className="form-group destination_search mt-5">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Rechercher ..."
        />
      </div>
      <div className="row mt-5 mb-3">
        {paginatedDestinations.reverse().map((destination) => (
          <div
            key={destination.id}
            className="col-sm-6 col-md-6 displayDestinations"
          >
            <DestinationCards
              id={destination.id}
              image={destination.image}
              city={destination.city}
              tours={destination.tours}
              pays={destination.pays}
            />
          </div>
        ))}
      </div>
      {itemsPerPage < filteredDestinations.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredDestinations.length}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  );
};

export default DestinationsPage;
