import React from "react";
import { Link } from "react-router-dom";

const TableAdminTours = ({ paginatedDestinations, handleDelete }) => {
  return (
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
  );
};

export default TableAdminTours;
