import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Destinations.css";
import AOS from "aos";
import "aos/dist/aos.css";
import destinationsApi from "../../services/destinationsApi";

const ErrorBoundary = lazy(() => import("../ErrorBoundary"));
const DestinationCard = lazy(() =>
  import("../destinationCard/DestinationCard")
);
const ImageGrid = lazy(() => import("../loaders/ImageGrid"));

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
      toast.error("Les destinations n'ont pas pu être chargées");
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
    <ErrorBoundary>
      <Suspense fallback={<div>Chargement...</div>}>
        <section data-aos="fade-up" className="container">
          <h1 className="destinations_h1 mt-5">Les dernières destinations</h1>
          {!loading && (
            <div className="row mt-5">
              {destinations
                .reverse()
                .slice(0, 4)
                .map((destination) => (
                  <div
                    key={destination.id}
                    className="col-sm-6 col-md-6 col-xl-6 displayDestinations"
                  >
                    <DestinationCard
                      id={destination.id}
                      image={destination.image}
                      city={destination.city}
                      tours={destination.tours}
                      country={destination.country}
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default Destinations;
