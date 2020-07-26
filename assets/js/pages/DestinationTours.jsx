import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import destinationsApi from "../services/destinationsApi";

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
    <div className="mt-5">
      {destination.tours &&
        destination.tours.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
          </div>
        ))}
    </div>
  );
};

export default DestinationTours;
