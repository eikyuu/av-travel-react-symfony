import React, { useState, useEffect, lazy } from "react";
import destinationsApi from "../../services/destinationsApi";
import "./DetailDestination.css";
import { Link } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
const ImageGrid = lazy(() => import("../../components/loaders/ImageGrid"));

const DetailDestination = ({ match }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    image: "",
    tours: 0,
  });
  const fetchDestination = async (id) => {
    try {
      const {
        title,
        description,
        country,
        city,
        image,
        tours,
      } = await destinationsApi.find(id);
      setDestinations({ title, description, country, city, image, tours });
      setLoading(false);
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
          {!loading && (
            <>
              <h1 className="detailDestination_h1 col-12">
                {destinations.title}
              </h1>
              <img
                className="col-sm-12 col-xl-6 mt-3 mb-3"
                src={destinations.image}
                alt="image destination"
              />
              <p className="detailDestination_p col-sm-12 col-xl-6 mt-2">
                {destinations.description}
              </p>
              <p className="detailDestination_p col-sm-12 col-xl-6">
                {destinations.city} {destinations.country}
              </p>
            </>
          )}
          {loading && <ImageGrid />}
        </div>

        <Link
          to={"/destination/" + id + "/tours"}
          className="btn btn-warning mb-3"
        >
          voir les croisières
        </Link>
      </section>
    </ErrorBoundary>
  );
};

export default DetailDestination;
