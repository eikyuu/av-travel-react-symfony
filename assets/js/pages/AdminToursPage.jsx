import React, { useState, useEffect } from "react";
import toursApi from "../services/toursApi";
import Pagination from "../components/Pagination";

const AdminToursPage = (props) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = async (id) => {
    const originalTours = [...tours];
    setTours(tours.filter((tour) => tour.id !== id));
    try {
      await toursApi.delete(id);
    } catch (error) {
      setTours(originalTours);
    }
  };

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 5;
  const paginatedTours = Pagination.getData(tours, currentPage, itemsPerPage);
  return (
    <>
      <div className="container mt-3">
        <h1>Liste des tours</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id.</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Jours</th>
              <th>Prix</th>
              <th>Image</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedTours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.id}</td>
                <td>{tour.title}</td>
                <td>{tour.description}</td>
                <td>{tour.days}</td>
                <td>{tour.price}€</td>
                <td>{tour.image}</td>
                <td>
                  <button
                    onClick={() => handleDelete(tour.id)}
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
          length={tours.length}
          onPageChanged={handlePageChange}
        />
      </div>
    </>
  );
};

export default AdminToursPage;
