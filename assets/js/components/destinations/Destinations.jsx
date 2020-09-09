import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Destinations.css";
import AOS from "aos";
import "aos/dist/aos.css";
import DestinationCards from "../DestinationCards";
import ImageGrid from "../loaders/ImageGrid";
import destinationsApi from "../../services/destinationsApi";
import { toast } from "react-toastify";

const Destinations = () => {
  AOS.init({
    duration: 3000,
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = async () => {
    try {
      const data = await destinationsApi.findAll();
      setDestinations(data);
      setLoading(false);
    } catch (error) {
      toast.error("La destination n'a pas pu être chargé");
    }
  };
  let isSubscribed = true;
  useEffect(() => {
    if (isSubscribed) {
      fetchDestinations();
    }
    return () => (isSubscribed = false);
  }, []);

  return (
    <section data-aos="fade-up" className="container">
      <h1 className=" mt-5 destinations_h1">Les dernières destinations</h1>
      {!loading && (
        <div className="row mt-5">
          {destinations
            .reverse()
            .slice(0, 4)
            .map((destination) => (
              <div
                key={destination.id}
                className="col-sm-6 col-md-6 displayDestinations"
              >
                <DestinationCards
                  id={destination.id}
                  image={destination.image}
                  city={destination.city}
                  tours={destination.tours}
                  pays={destination.pays}
                />
              </div>
            ))}
          <Link to="/destinations" className="mt-3 btn btn-warning mx-auto">
            Voir toutes les destinations
          </Link>
        </div>
      )}
      {loading && <ImageGrid />}
    </section>
  );
};

export default Destinations;
