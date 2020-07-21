import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tours.css";
import useTours from "../../customHooks/useTours";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageGrid from "../loaders/ImageGrid";
import toursApi from "../../services/toursApi";
import ToursCards from "../ToursCards";

const Tours = (props) => {
  AOS.init({
    duration: 3000,
  });
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTours = async () => {
    try {
      const data = await toursApi.findAll();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.log("Impossible de charger les tours");
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      fetchTours();
    }
    return () => (isSubscribed = false);
  }, []);

  return (
    <div data-aos="fade-up" className="container mt-5">
      <h1 className="tours_h1">Les derniers tours</h1>
      {!loading && (
        <div className="row mt-5">
          {tours
            .reverse()
            .slice(0, 6)
            .map((tours) => (
              <div key={tours.id} className="mt-3 col-sm-6 col-md-4">
                <ToursCards
                  image={tours.image}
                  title={tours.title}
                  description={tours.description}
                  days={tours.days}
                  price={tours.price}
                />
              </div>
            ))}
        </div>
      )}
      <div className="row mt-4 mb-5">
        <Link to="/tours" className="mt-3 btn btn-warning mx-auto">
          Voir tous les tours
        </Link>
      </div>
      {loading && <ImageGrid />}
    </div>
  );
};

export default Tours;
