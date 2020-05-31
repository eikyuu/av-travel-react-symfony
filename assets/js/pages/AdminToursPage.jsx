import React from "react";
import useTours from "../customHooks/useTours";

const AdminToursPage = (props) => {
  const tours = useTours();
  return (
    <>
      <div className="container mt-3">
        <h1>Liste des tours</h1>
      </div>
      <table className="table table-hover container">
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
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.id}</td>
              <td>{tour.title}</td>
              <td>{tour.description}</td>
              <td>{tour.days}</td>
              <td>{tour.price}€</td>
              <td>{tour.image}</td>
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

export default AdminToursPage;
