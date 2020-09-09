import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import destinationsApi from "../services/destinationsApi";
import ToursCards from "../components/ToursCards";

const DestinationTours = ({ match }) => {
  const { id } = match.params;

  const [destination, setDestination] = useState({});

  const fetchDestination = async (id) => {
    try {
      const destination = await destinationsApi.find(id);

      setDestination(destination);
    } catch (error) {
      toast.error("La destination n'a pas pu être chargé");
    }
  };

  useEffect(() => {
    fetchDestination(id);
  }, [id]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {destination.tours &&
          destination.tours.map((tours) => (
            <div key={tours.id} className="mt-3 col-sm-6 col-md-4">
              <ToursCards
                id={tours.id}
                image={tours.image}
                title={tours.title}
                description={tours.description}
                days={tours.days}
                price={tours.price}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DestinationTours;
