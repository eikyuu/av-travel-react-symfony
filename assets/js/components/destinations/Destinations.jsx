import React, { useEffect, useState } from "react";
import "./Destinations.css";
import useDestinations from "../../customHooks/useDestinations";

const Destinations = (props) => {
  const destinations = useDestinations();

  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="col-12 mt-5 mb-3 destinations_h1">
          Les dernieres destinations
        </h1>
        {destinations
          .reverse()
          .slice(0, 4)
          .map((destination) => (
            <div
              key={destination.id}
              className="col-sm-6 col-md-6 my-1 displayDestinations"
            >
              <a href="http://google.com">
                <img
                  className="destinations_img"
                  alt=""
                  src={destination.image}
                />
                <div className="destinations_city">
                  <p>
                    {destination.pays} {destination.city}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary mr-1 destinations_button"
                  >
                    {destination.tours.length} tours
                  </button>
                </div>
              </a>
            </div>
          ))}

        <button type="submit" className="btn btn-warning mx-auto">
          Voir toutes les destinations
        </button>
      </div>
    </div>
  );
};

export default Destinations;
