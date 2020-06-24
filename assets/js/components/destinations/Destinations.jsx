import React from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";
import useDestinations from "../../customHooks/useDestinations";
import AOS from "aos";
import "aos/dist/aos.css";

const Destinations = (props) => {
  AOS.init({
    duration: 3000,
  });
  // custom hooks
  const destinations = useDestinations();

  return (
    <div data-aos="fade-up" className="container">
      <h1 className=" mt-5 destinations_h1">Les dernieres destinations</h1>
      <div className="row mt-5">
        {destinations
          .reverse()
          .slice(0, 4)
          .map((destination) => (
            <div
              key={destination.id}
              className="col-sm-6 col-md-6 displayDestinations"
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/destinations/" + destination.id}
              >
                <img
                  className="destinations_img"
                  alt=""
                  src={destination.image}
                />
                <div className="destinations_city">
                  <p className="destinations_city_p">
                    {destination.pays} {destination.city}
                  </p>
                  <div className="mr-1 destinations_button">
                    {destination.tours.length} tours
                  </div>
                </div>
              </Link>
            </div>
          ))}
        <Link to="/destinations" className="mt-3 btn btn-warning mx-auto">
          Voir toutes les destinations
        </Link>
      </div>
    </div>
  );
};

export default Destinations;
