import React, { useState, useEffect, lazy, Suspense } from "react";
import "../components/tours/Tours.css";
import Pagination from "../components/Pagination";
import toursApi from "../services/toursApi";
import ErrorBoundary from "../components/ErrorBoundary";
const ToursCards = lazy(() => import("../components/ToursCards"));
const ImageGrid = lazy(() => import("../components/loaders/ImageGrid"));
const SearchBar = lazy(() => import("../components/SearchBar"));

const ToursPage = (props) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const data = await toursApi.findAll();
      setTours(data);
      setLoading(false);
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
    <ErrorBoundary>
      <Suspense fallback={<div>Chargement...</div>}>
        <section className="container mt-5">
          <h1 className="mt-5 tours_h1">Toutes les croisières</h1>
          <div className="form-group destination_search mt-5">
            <SearchBar handleSearch={handleSearch} search={search} />
          </div>

          {!loading && (
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
          )}
          {loading && <ImageGrid />}
          {itemsPerPage < filteredTours.length && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              length={filteredTours.length}
              onPageChanged={handlePageChange}
            />
          )}
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ToursPage;
