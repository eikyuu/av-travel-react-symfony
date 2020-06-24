import React, { useState } from "react";
import "./../components/destinations/Destinations.css";
import useDestinations from "../customHooks/useDestinations";
import Pagination from "../components/Pagination";

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
          <div
            key={destination.id}
            className="col-sm-6 col-md-6 my-1 displayDestinations"
          >
            <a href="http://google.com">
              <img
                className="destinations_img"
                alt=""
                src={destination.image}
              />
              <div className="destinations_city">
                <p>
                  {destination.pays} {destination.city}
                </p>
                <button
                  type="button"
                  className="btn btn-primary mr-1 destinations_button"
                >
                  {destination.tours.length} tours
                </button>
              </div>
            </a>
          </div>
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
