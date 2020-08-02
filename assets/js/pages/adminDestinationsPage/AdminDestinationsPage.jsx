import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import destinationsApi from "../../services/destinationsApi";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "./AdminDestinationsPage.css";

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
        <div className="form-group destination_search">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Rechercher ..."
          />
        </div>

        <table className="table table-hover destination_table">
          <thead>
            <tr>
              <th>Id.</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Pays</th>
              <th>Ville</th>
              <th>Image</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedDestinations.reverse().map((destination) => (
              <tr key={destination.id}>
                <td data-label="id">{destination.id}</td>
                <td data-label="Titre">{destination.title}</td>
                <td data-label="Description">{destination.description}</td>
                <td data-label="Pays">{destination.pays}</td>
                <td data-label="Ville">{destination.city}</td>
                <td>
                  <Link
                    to={"/admin/destinations/" + destination.id}
                    className="btn btn-sm btn-primary"
                  >
                    Editer
                  </Link>
                  <button
                    onClick={() => handleDelete(destination.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
