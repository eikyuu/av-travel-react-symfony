import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import destinationsApi from "../../services/destinationsApi";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "./AdminDestinationsPage.css";
import SearchBar from "../../components/SearchBar";
import TableAdminTours from "../../components/TableAdminTours";

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchDestinations = async () => {
    try {
      const data = await destinationsApi.findAll();
      setDestinations(data);
    } catch (error) {
      console.log("Impossible de charger les destinations");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // delete management
  const handleDelete = async (id) => {
    const originalDestinations = [...destinations];
    setDestinations(
      destinations.filter((destination) => destination.id !== id)
    );
    try {
      await destinationsApi.delete(id);
      toast.success("La destination a bien été supprimer");
    } catch (error) {
      setDestinations(originalDestinations);
      toast.error("Erreur dans la supression de la destinations");
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

  return (
    <>
      <div className="container destinations">
        <div className="mb-3 d-flex justify-content-between align-items-center destination_block">
          <h1 className="destinations_h1">Liste des destinations</h1>
          <Link
            to="/admin/destinations/new"
            className="btn btn-primary destination_button"
          >
            Créer une destination
          </Link>
        </div>
        <SearchBar handleSearch={handleSearch} search={search} />
        <TableAdminTours
          paginatedDestinations={paginatedDestinations}
          handleDelete={handleDelete}
        />

        {itemsPerPage < filteredDestinations.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredDestinations.length}
            onPageChanged={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default AdminDestinationsPage;
