import React from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";
import useDestinations from "../../customHooks/useDestinations";
import AOS from "aos";
import "aos/dist/aos.css";
import DestinationCards from "../DestinationCards";

const Destinations = () => {
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
            <DestinationCards
              id={destination.id}
              image={destination.image}
              city={destination.city}
              tours={destination.tours}
              pays={destination.pays}
            />
          ))}
        <Link to="/destinations" className="mt-3 btn btn-warning mx-auto">
          Voir toutes les destinations
        </Link>
      </div>
    </div>
  );
};

export default Destinations;
