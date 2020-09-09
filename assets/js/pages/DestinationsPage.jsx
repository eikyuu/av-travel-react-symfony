import React, { useState, useEffect } from "react";
import "./../components/destinations/Destinations.css";
import Pagination from "../components/Pagination";
import DestinationCards from "../components/DestinationCards";
import ImageGrid from "../components/loaders/ImageGrid";
import destinationsApi from "../services/destinationsApi";
import SearchBar from "../components/SearchBar";
const DestinationsPage = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      const data = await destinationsApi.findAll();
      setDestinations(data);
      setLoading(false);
    } catch (error) {
      console.log("Impossible de charger les destinations");
    }
  };
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

  useEffect(() => {
    fetchDestinations();
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="mt-5 destinations_h1">Toutes les destinations</h1>
      <div className="form-group destination_search mt-5">
        <SearchBar handleSearch={handleSearch} search={search} />
      </div>

      {!loading && (
        <div className="row mt-5 mb-3">
          {paginatedDestinations.map((destination) => (
            <div
              key={destination.id}
              className="col-sm-12 col-md-6 displayDestinations"
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
      )}
      {loading && <ImageGrid />}
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
