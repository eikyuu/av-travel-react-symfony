import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toursApi from "../../services/toursApi";
import Pagination from "../../components/Pagination";
import { toast } from "react-toastify";
import "./AdminToursPage.css";

const AdminToursPage = (props) => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

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

  // gestion de la supression
  const handleDelete = async (id) => {
    const originalTours = [...tours];
    setTours(tours.filter((tour) => tour.id !== id));
    try {
      await toursApi.delete(id);
      toast.success("Le tours a bien été supprimer");
    } catch (error) {
      setTours(originalTours);
      toast.error("Erreur dans la supression du tours");
    }
  };

  const filteredTours = tours.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);
  const itemsPerPage = 10;
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
    <>
      <div className="container tours">
        <div className="mb-3 d-flex justify-content-between align-items-center tours_block">
          <h1 className="tours_h1">Liste des tours</h1>
          <Link to="/admin/tours/new" className="btn btn-primary tours_button">
            Créer un tours
          </Link>
        </div>
        <div className="form-group tours_search">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Rechercher ..."
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id.</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Jours</th>
              <th>Prix</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {paginatedTours.map((tour) => (
              <tr key={tour.id}>
                <td data-label="Id">{tour.id}</td>
                <td data-label="Titre">{tour.title}</td>
                <td data-label="Description">{tour.description}</td>
                <td data-label="Jours">{tour.days}</td>
                <td data-label="Prix">{tour.price}€</td>
                <td>
                  <Link
                    to={"/admin/tours/" + tour.id}
                    className="btn btn-sm btn-primary"
                  >
                    Editer
                  </Link>
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
        {itemsPerPage < filteredTours.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredTours.length}
            onPageChanged={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default AdminToursPage;
