import React from "react";
import "../components/tours/Tours.css";
import useTours from "../customHooks/useTours";

const ToursPage = (props) => {
  const tours = useTours();
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <h1 className="col-12">Tous les tours</h1>
        {tours.reverse().map((tours) => (
          <div key={tours.id} className="mt-3 col-sm-6 col-md-4 mx-auto">
            <a href="http://google.com">
              <div className="card">
                <img src={tours.image} className="card-img-top" alt="..." />
                <div className="m-3">
                  <h5 className="tours_title">{tours.title}</h5>
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
    </div>
  );
};

export default ToursPage;
