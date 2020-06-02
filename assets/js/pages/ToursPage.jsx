import React, { useState } from "react";
import "../components/tours/Tours.css";
import useTours from "../customHooks/useTours";
import Pagination from "../components/Pagination";

const ToursPage = (props) => {
  const tours = useTours();
  const [currentPage, setCurrentPage] = useState(1);

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 6;
  const paginatedTours = Pagination.getData(tours, currentPage, itemsPerPage);

  return (
    <div className="container mt-5">
      <div className="row mt-5 mb-3">
        <h1 className="col-12">Tous les tours</h1>
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
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={tours.length}
        onPageChanged={handlePageChange}
      />
    </div>
  );
};

export default ToursPage;
