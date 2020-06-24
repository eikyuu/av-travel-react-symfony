import React, { useState, useEffect } from "react";
import destinationsApi from "../services/destinationsApi";

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
    <div className="container">
      <h1>
        {destinations.city} {destinations.pays}
      </h1>
      <img className="col-6" src={destinations.image} alt="" />
      <p>{destinations.title}</p>
      <p>{destinations.description}</p>
      <button type="button" className="btn btn-primary">
        {destinations.tours.length} tours
      </button>
      <button className="btn btn-warning"> voir les tours</button>
    </div>
  );
};

export default DetailDestination;
