import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import destinationsApi from "../../services/destinationsApi";
import { toast } from "react-toastify";
import "./AdminDestinationsPage.css";

import Pagination from "../../components/Pagination";
import ErrorBoundary from "../../components/ErrorBoundary";

const SearchBar = lazy(() => import("../../components/SearchBar"));
const TableAdminTours = lazy(() => import("../../components/TableAdminTours"));

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

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

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

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Chargement...</div>}>
        <section className="container destinations">
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
        </section>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AdminDestinationsPage;
