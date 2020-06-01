import React, { useEffect, useState } from "react";
import destinationsApi from "../services/destinationsApi";
import Pagination from "../components/Pagination";

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = async (id) => {
    const originalDestinations = [...destinations];
    setDestinations(
      destinations.filter((destination) => destination.id !== id)
    );
    try {
      await destinationsApi.delete(id);
    } catch (error) {
      setDestinations(originalDestinations);
    }
  };

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 5;
  const start = currentPage * itemsPerPage - itemsPerPage;
  const paginatedDestinations = destinations.slice(start, start + itemsPerPage);
  return (
    <>
      <div className="container mt-3">
        <h1>Liste des destinations</h1>

        <table className="table table-hover">
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
            {paginatedDestinations.map((destination) => (
              <tr key={destination.id}>
                <td>{destination.id}</td>
                <td>{destination.title}</td>
                <td>{destination.description}</td>
                <td>{destination.pays}</td>
                <td>{destination.city}</td>
                <td>{destination.image}</td>
                <td>
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

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={destinations.length}
          onPageChanged={handlePageChange}
        />
      </div>
    </>
  );
};

export default AdminDestinationsPage;
