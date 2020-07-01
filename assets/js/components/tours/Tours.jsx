import React from "react";
import { Link } from "react-router-dom";
import "./Tours.css";
import useTours from "../../customHooks/useTours";
import AOS from "aos";
import "aos/dist/aos.css";
const Tours = (props) => {
  AOS.init({
    duration: 3000,
  });
  const tours = useTours();
  return (
    <div data-aos="fade-up" className="container mt-5">
      <h1 className="tours_h1">Les derniers tours</h1>
      <div className="row mt-5">
        {tours
          .reverse()
          .slice(0, 6)
          .map((tours) => (
            <div key={tours.id} className="mt-3 col-sm-6 col-md-4">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="http://google.com"
                className="card"
              >
                <img src={tours.image} className="card-img-top" alt="..." />
                <div className="m-3">
                  <h5 className="tours_title">{tours.title}</h5>
                  <p className="card-text">{tours.description}</p>
                  <div className="div_price_days">
                    <p className="card-text">{tours.days} jours</p>
                    <p className="card-text">{tours.price}€</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
      <div className="row mt-4 mb-5">
        <Link to="/tours" className="mt-3 btn btn-warning mx-auto">
          Voir tous les tours
        </Link>
      </div>
    </div>
  );
};

export default Tours;
