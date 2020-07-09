import React, { useState } from "react";
import "../components/tours/Tours.css";
import useTours from "../customHooks/useTours";
import Pagination from "../components/Pagination";

const ToursPage = (props) => {
  const tours = useTours();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // filter management
  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(search.toLowerCase())
  );

  // Page change management
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 9;
  const paginatedTours = Pagination.getData(
    filteredTours,
    currentPage,
    itemsPerPage
  );

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-5 tours_h1">Tous les tours</h1>
      <div className="form-group destination_search mt-5">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Rechercher ..."
        />
      </div>
      <div className="row mt-5 mb-4">
        {paginatedTours.reverse().map((tours) => (
          <div key={tours.id} className="mt-3 col-sm-6 col-md-4 mx-auto">
            <a href="http://google.com">
              <div className="card">
                <img src={tours.image} className="card-img-top" alt="..." />
                <div className="m-3">
                  <h5 className="tours_title">{tours.title}</h5>
                  <p className="card-text">{tours.description}</p>
                  <div className="div_price_days mt-3">
                    <p className="card-text">{tours.days} jours</p>
                    <p className="card-text">{tours.price} €</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      {itemsPerPage < filteredTours.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredTours.length}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  );
};

export default ToursPage;
