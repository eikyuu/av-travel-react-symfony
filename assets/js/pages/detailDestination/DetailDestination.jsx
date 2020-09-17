import React, { useState, useEffect } from "react";
import destinationsApi from "../../services/destinationsApi";
import "./DetailDestination.css";
import { Link } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const DetailDestination = ({ match }) => {
  const { id } = match.params;
  const [destinations, setDestinations] = useState({
    title: "",
    description: "",
    pays: "",
    city: "",
    image: "",
    tours: 0,
  });
  const fetchDestination = async (id) => {
    try {
      const {
        title,
        description,
        pays,
        city,
        image,
        tours,
      } = await destinationsApi.find(id);
      setDestinations({ title, description, pays, city, image, tours });
    } catch (error) {
      toast.error("La destination n'a pas pu être chargé");
    }
  };

  useEffect(() => {
    fetchDestination(id);
  }, [id]);

  return (
    <ErrorBoundary>
      <section className="container detailDestination">
        <div className="row detailDestination_row">
          <h1 className="detailDestination_h1 col-12">{destinations.title}</h1>
          <img
            className="col-12 mt-3 mb-3"
            src={destinations.image}
            alt="image destination"
          />
          <p className="detailDestination_p col-12">
            {destinations.description}
          </p>
          <p className="detailDestination_p col-12">
            {destinations.city} {destinations.pays}
          </p>
        </div>

        <Link to={"/destinations/" + id + "/tours"} className="btn btn-warning">
          voir les croisières
        </Link>
      </section>
    </ErrorBoundary>
  );
};

export default DetailDestination;
