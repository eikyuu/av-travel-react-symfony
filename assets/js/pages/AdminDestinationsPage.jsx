import React from "react";
import useDestinations from "../customHooks/useDestinations";

const AdminDestinationsPage = (props) => {
  const destinations = useDestinations();
  return (
    <>
      <div className="container mt-3">
        <h1>Liste des destinations</h1>
      </div>
      <table className="table table-hover container">
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
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.id}</td>
              <td>{destination.title}</td>
              <td>{destination.description}</td>
              <td>{destination.pays}</td>
              <td>{destination.city}</td>
              <td>{destination.image}</td>
              <td>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminDestinationsPage;
