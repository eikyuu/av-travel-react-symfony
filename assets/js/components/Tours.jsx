import React, { useState, useEffect } from "react";
import toursApi from "../services/toursApi";
import "./Tours.css";
const Tours = props => {
  const [tours, setTours] = useState([]);

  const fetchDestinations = async () => {
    try {
      const data = await toursApi.findAll();
      setTours(data);
    } catch (error) {
      console.log("Impossible de charger les tours");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <h1 className="col-12">Tours populaire</h1>
        {tours.slice(0, 6).map(tours => (
          <div key={tours.id} className="mt-3 col-sm-6 col-md-4 mx-auto">
            <a href="http://google.com">
              <div className="card">
                <img src={tours.image} className="card-img-top" alt="..." />
                <div className="m-3">
                  <h5 className="tours_title">{tours.nameImage}</h5>
                  <h5 className="">{tours.title}</h5>
                  <p className="card-text">{tours.description}</p>
                  <div className="div_price_days mt-3">
                    <p className="card-text">{tours.days} jours</p>
                    <p className="card-text">{tours.price} €</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="row mt-4 mb-5">
        <button type="submit" className="btn btn-warning mx-auto">
          Voir tous les tours
        </button>
      </div>
    </div>
  );
};

export default Tours;
