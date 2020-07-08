import React, { useState } from "react";
import "./../components/destinations/Destinations.css";
import useDestinations from "../customHooks/useDestinations";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import DestinationCards from "../components/DestinationCards";

const DestinationsPage = (props) => {
  const destinations = useDestinations();
  const [currentPage, setCurrentPage] = useState(1);

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 6;
  const paginatedDestinations = Pagination.getData(
    destinations,
    currentPage,
    itemsPerPage
  );

  return (
    <div className="container">
      <h1 className="mt-5 destinations_h1">Toutes les destinations</h1>
      <div className="row mt-5">
        {paginatedDestinations.reverse().map((destination) => (
          <DestinationCards
            id={destination.id}
            image={destination.image}
            city={destination.city}
            tours={destination.tours}
            pays={destination.pays}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={destinations.length}
        onPageChanged={handlePageChange}
      />
    </div>
  );
};

export default DestinationsPage;
