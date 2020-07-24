import React, { useState, useEffect } from "react";
import "../components/tours/Tours.css";
import Pagination from "../components/Pagination";
import ToursCards from "../components/ToursCards";
import toursApi from "../services/toursApi";

const ToursPage = (props) => {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const data = await toursApi.findAll();
      setTours(data);
    } catch (error) {
      console.log("Impossible de charger les tours");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

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
          <div key={tours.id} className="mt-3 col-sm-6 col-md-4">
            <ToursCards
              id={tours.id}
              image={tours.image}
              title={tours.title}
              description={tours.description}
              days={tours.days}
              price={tours.price}
            />
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
